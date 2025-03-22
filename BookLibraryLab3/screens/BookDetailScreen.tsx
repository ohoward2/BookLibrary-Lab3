import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { FIREBASE_DB, collection, getDocs, getDoc, doc, addDoc } from "../config/firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

// Book Details Screen
const BookDetailScreen = ({ route, navigation }: any) => {
    const { bookId } = route.params;
    const [book, setBook] = useState<any>(null);
    const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);

    // Load book details whenever the book detail screen comes into focus.
    useFocusEffect(
        React.useCallback(() => {
            const getBook = async () => {
                const docRef = doc(FIREBASE_DB, 'books', bookId);
                const docSnapshot = await getDoc(docRef);
    
                if (docSnapshot.exists()) {
                    setBook(docSnapshot.data());
                } else {
                    console.log('No such book!');
                }
            };

        const getBorrowedBooks = async () => {
            const querySnapshot = await getDocs(collection(FIREBASE_DB, 'borrowedBooks'));
            const borrowedData = querySnapshot.docs.map(doc => doc.data());
            setBorrowedBooks(borrowedData);
        };

        getBook();
        getBorrowedBooks();
    }, [bookId]));

    // Function to borrow a book
    const borrowBook = async () => {

        // Check to see if book is already in the borrowed books list
        const isBookAlreadyBorrowed = borrowedBooks.some(book => book.bookId === bookId);

        if(isBookAlreadyBorrowed){
            Alert.alert('Book Already Borrowed', 'This book is already in your borrowed books list.');
            return;
        }
        
        // Alert if limit of 3 borrowed books is already reached.
        if(borrowedBooks.length >= 3) {
            Alert.alert('Limit Reached', 'You cannot borrow more than 3 books at a time.');
            return;
        }

        // Add book to borrowed book collection
        try {
        const borrowedBook = {
            bookId: bookId,
            title: book?.title,
            author: book?.author,
        };

        await addDoc(collection(FIREBASE_DB, 'borrowedBooks'), borrowedBook);
        navigation.navigate('BorrowedBooks');
       } catch(error) {
        console.log('Error borrowing the book:', error);
        Alert.alert('Error', 'There was a problem borrowing the book. Please try again.');
       }
    };

    // Function to navigate to borrowed books screen
    const navigateToBorrowedBooks = () => {
        navigation.navigate('BorrowedBooks');
    };

    return (
        <View style={styles.container}>
            { book && (
                <>
                    <View style={styles.card}>
                        <Text style={styles.label}>Title: "{book.title}"</Text>
                        <View style={styles.textGroup}>
                            <Text style={styles.smallLabel}>Author: </Text>
                            <Text style={styles.value}>{book.author}</Text>
                        </View>
                        <View style={styles.textGroup}>
                            <Text style={styles.smallLabel}>ISBN: </Text>
                            <Text style={styles.value}>{book.isbn}</Text>
                        </View>
                        <View style={styles.textGroup}>
                            <Text style={styles.smallLabel}>Genre: </Text>
                            <Text style={styles.value}>{book.genre}</Text>
                        </View>
                        <Text style={styles.smallLabel}>Description: </Text>
                        <Text>{book.description}</Text>

                        <TouchableOpacity style={styles.borrowButton} onPress={borrowBook}>
                            <Text style={styles.buttonText}>Borrow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navigateButton} onPress={navigateToBorrowedBooks}>
                            <Text style={styles.buttonText}>Go to Borrowed Books</Text>
                        </TouchableOpacity>
                    </View>
                    
                </>
            )}
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 15,
        marginBottom: 15,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    smallLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: "#555"
    },
    textGroup: {
        flexDirection: "row"
    },
    borrowButton: {
        backgroundColor: "seagreen",
        padding: 12,
        marginTop: 20,
        borderRadius: 5,
        alignItems: "center",
    },
    navigateButton: {
        backgroundColor: "dodgerblue",
        padding: 12,
        marginTop: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },


});

export default BookDetailScreen;