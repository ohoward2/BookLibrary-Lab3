import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookListScreen from '../screens/BookListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import BorrowedBooksScreen from '../screens/BorrowedBookScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "dodgerblue"
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 30
                },
            }}
            >
                <Stack.Screen name="BookList" component={BookListScreen} />
                <Stack.Screen name="BookDetail" component={BookDetailScreen} />
                <Stack.Screen name="BorrowedBooks" component={BorrowedBooksScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}