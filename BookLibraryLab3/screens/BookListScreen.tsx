import { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_DB, collection, getDocs } from "../config/firebaseConfig";

// Book List Screen
const BookListScreen = ({navigation}: any) => {
    const [books, setBooks] = useState<any[]>([]);

    // Load list of books from firebase db
    useEffect(() => {
        const getBooks = async () => {
            const querySnapshot = await getDocs(collection(FIREBASE_DB, 'books'));
            const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setBooks(booksData);
        };

        getBooks();
    }, []);

    // Function to navigate to the borrowed books screen
    const navigateToBorrowedBooks = () => {
        navigation.navigate('BorrowedBooks');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.listHeader}>Available Books at our library:</Text>
            <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
                >
                    <View style={styles.bookItem}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.boldText}>{item.title}</Text>
                            <Text>by {item.author}</Text>
                        </View>
                        <Text style={styles.genreText}>Genre: {item.genre}</Text>
                    </View>    
                </TouchableOpacity>
            )}
            />
            <TouchableOpacity style={styles.navigateButton} onPress={navigateToBorrowedBooks}>
                <Text style={styles.buttonText}>Go to Your Borrowed Books</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listHeader: {
        fontWeight: "bold",
        fontSize: 18,
        paddingBottom: 8,
        color: "dodgerblue",
    },
    bookItem: {
        backgroundColor: "#ffffff",
        padding: 15,
        marginBottom: 15,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    logOutButton: {
        backgroundColor: "steelblue",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    boldText: {
        fontWeight: "bold"
    },
    navigateButton: {
        backgroundColor: "dodgerblue",
        padding: 12,
        marginTop: 20,
        borderRadius: 5,
        alignItems: "center",
    },
    leftContainer: {
        flex: 1,
    },
    genreText:{
        color: 'gray',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        fontSize: 10
    }
});

export default BookListScreen;