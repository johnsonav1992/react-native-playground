import {
    QueryClient
    , QueryClientProvider
    , useQuery
} from '@tanstack/react-query';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import {
    FlatList
    , SafeAreaView
    , StyleSheet
    , Text
} from 'react-native';

const MainComp = () => {
    const { data } = useQuery( {
        queryKey: [ 'todos' ]
        , queryFn: () => axios
            .get<{ title: string }[]>( 'https://jsonplaceholder.typicode.com/todos' )
            .then( res => res.data )
    } );

    return (
        <SafeAreaView style={ styles.container }>
            <Text>Hey hey!</Text>
            <FlatList
                data={ data }
                renderItem={ ( { item } ) => (
                    <Text>{ item.title }</Text>
                ) }
            />
            <StatusBar style='auto' />
        </SafeAreaView>
    );
};

export default function App () {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={ queryClient }>
            <MainComp />
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1
        , backgroundColor: '#fff'
        , alignItems: 'center'
        , justifyContent: 'center'
    }
} );
