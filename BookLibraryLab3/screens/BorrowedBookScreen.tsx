import { useEffect, useState  } from "react";
import { View, FlatList, Text, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { FIREBASE_DB, collection, getDocs, doc, deleteDoc } from "../config/firebaseConfig";

// Borrowed Books Screen
const BorrowedBooksScreen = () => {
    const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);

    // Load list of borrowed books on the screen.
    useEffect(() => {
        const getBorrowedBooks = async () => {
            const querySnapshot = await getDocs(collection(FIREBASE_DB, 'borrowedBooks'));
            const borrowedData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setBorrowedBooks(borrowedData);
        };

        getBorrowedBooks();

    }, []);

    // Function to return book (delete book doc from borrowed books collection on firebase)
    const returnBook = async (bookId: string) => {
        try {
            await deleteDoc(doc(FIREBASE_DB, 'borrowedBooks', bookId));

            setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));

            Alert.alert('Success', 'Book has been returned successfully.');
        } catch(error) {
            console.log('Error returning the book:', error);
            Alert.alert('Error', 'There was an issue returning the book. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={borrowedBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.smallLabel}>{item.title}</Text>
                        <Text style={styles.value}>by {item.author}</Text>
                        <TouchableOpacity style={styles.returnButton} onPress={() => returnBook(item.id)}>
                            <Text style={styles.buttonText}>Return</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
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
    returnButton: {
        backgroundColor: "seagreen",
        padding: 12,
        marginTop: 20,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },


});

export default BorrowedBooksScreen;