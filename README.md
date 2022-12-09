# La Libriothèque

La Libriothèque is a free ebooks library, using the Gutenberg.org API (Gutendex). There are 3476 ebooks available, in French and in the public domain.
The user can search for books by title or by the author's name. The user can add his favorites books in his favorites page. To do so, he must sign up and login. In the profile page, the user can update his password.

# DEMO

https://libriotheque.netlify.app/

# About back-end implementation

- 3 model schemas: Ebook, FavEbook, User.
- 1 seed in order to fetch the data from the Gutenberg API.
- 1 route to create a user.
- 1 route to search ebooks in the Mongo database.
- 1 route to update the user.
- 1 route to add an ebook to the favorites.
- 1 route to delete a character from the favorites.
- Use of bcrypt to hash and protect users passwords.
- Use of Populate method to fetch and display the characters informations on the user's favorites page.

# About front-end implementation

- 1 search bar with a CSS toggle for the ebooks title/author search.
- 1 search page where the user get the searched ebooks on display.
- 1 page to display the book details : Title, author, cover, sujects and the possibility to get the ebook in 3 different formats : HTML, EPUB and MOBI. Plus, the User can add or delete a book in his favorites in this page.
- 1 sign-up page where the user registers and 1 sign-in page where the user connects to his account.
- 1 page where the user can see all his favorites ebooks.

# Possible improvements

- adding an administrator account in order to add more ebooks in the database and delete users accounts.
- Adding a media query in order to display the site correctly on smartphones and small screens.
