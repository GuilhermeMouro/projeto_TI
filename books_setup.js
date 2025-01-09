import { db } from "./firebase_config.js";
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

async function fetchBooks(selectedGenres = []) {
    try {
        const booksContainer = document.querySelector(".books-container");
        booksContainer.innerHTML = "";

        const booksSnapshot = await getDocs(collection(db, "books"));
        booksSnapshot.forEach((doc) => {
            const book = doc.data();

            if (selectedGenres.length > 0 && !selectedGenres.some((genre) => book.genres.includes(genre))) {
                return;
            }

            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");

            const bookImage = document.createElement("img");
            bookImage.classList.add("book-image");
            bookImage.src = book.image ? book.image : "img/default-book.jpg";
            bookImage.alt = `Capa de ${book.name}`;

            const bookTitle = document.createElement("h2");
            bookTitle.classList.add("book-title");
            bookTitle.textContent = book.name;

            const bookAuthor = document.createElement("p");
            bookAuthor.classList.add("book-author");
            bookAuthor.textContent = `de ${book.author}`;

            const bookGenres = document.createElement("p");
            bookGenres.classList.add("book-genres");
            bookGenres.textContent = `${book.genres.join(", ")}`;

            bookDiv.addEventListener("click", () => {
                const bookId = doc.id;
                window.location.href = `livro_selecionado.html?id=${bookId}`;
            });

            bookDiv.appendChild(bookImage);
            bookDiv.appendChild(bookTitle);
            bookDiv.appendChild(bookAuthor);
            bookDiv.appendChild(bookGenres);

            booksContainer.appendChild(bookDiv);
        });
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
    }
}

function getSelectedGenres() {
    const checkboxes = document.querySelectorAll(".genre-checkbox");
    const selectedGenres = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedGenres.push(checkbox.value);
        }
    });
    return selectedGenres;
}

document.querySelector("#apply-filters")?.addEventListener("click", () => {
    const selectedGenres = getSelectedGenres();
    fetchBooks(selectedGenres);
});

window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("livro_selecionado.html")) {
        fetchBookDetails();
    } else {
        fetchBooks();
    }
});

async function fetchBookDetails() {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");

    if (!bookId) {
        console.error("ID do livro não fornecido!");
        return;
    }

    try {
        const bookDoc = await getDoc(doc(db, "books", bookId));

        if (!bookDoc.exists()) {
            console.error("Livro não encontrado!");
            return;
        }

        const book = bookDoc.data();

        document.querySelector(".book-detail-title").textContent = book.name;
        document.querySelector(".book-detail-author").textContent = `de ${book.author}`;
        document.querySelector(".book-detail-description").textContent = book.description;
        document.querySelector(".book-detail-image").src = book.image;
    } catch (error) {
        console.error("Erro ao buscar os detalhes do livro:", error);
    }
}
