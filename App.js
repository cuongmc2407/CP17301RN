import { NavigationContainer }
    from "@react-navigation/native";
import { createNativeStackNavigator }
    from '@react-navigation/native-stack';
import Manager from './Manager'; // file App cũ
import { View, Text, Button } from "react-native";

const Stack = createNativeStackNavigator();
//tạo thêm 1 màn hình about để quản lý
const About = (props) => {
    const nav = props.navigation;

    return (<View>
        <Text>Trang About</Text>
        <Button
            title="Sang Manager"
            onPress={() => nav.navigate(
                'Manager',
                {name: 'Sản phẩm'}
            )}
        />
    </View>)
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Manager">
                <Stack.Screen
                    name="About" component={About}
                />
                <Stack.Screen
                    name="Manager" component={Manager}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default App;