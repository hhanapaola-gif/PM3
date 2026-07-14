import { Redirect } from "expo-router";
import { DefaultNavigator } from "expo-router/build/views/Navigator";


export default function index(){
    return <Redirect href="/alta" />;
}