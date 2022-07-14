/**
 * Main app handler
 *
 */
import React from 'react';
import * as SecureStore from 'expo-secure-store';
import * as SQLite from "expo-sqlite";
import {StyleSheet, StatusBar, View, Text, TextInput, Pressable} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import CreateDatabase from "./data/db/CreateDatabase";
import Register from "./data/db/Register";
import Home from "./components/screens/Home";
import Upload from "./components/screens/Upload";
import Post from "./components/screens/Post";
import SaveToken from "./data/secrets/SaveToken";

const AuthContext = React.createContext();

function RenderSignIn() {
    const [username, setUsername] = React.useState(''); // initialize username state variable
    const [password, setPassword] = React.useState(''); // initialize password state variable
    const { signIn } = React.useContext(AuthContext); // initialize and set signIn variable to React context function
    const { signUp } = React.useContext(AuthContext); // initialize and set signUp variable to React context function

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 30, color: "#F8F8FF" }}>Sign In/Register</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputLabelContainer}>
                    <Text style={{ fontSize: 25, color: "#F8F8FF" }}>Username</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Username..."
                               placeholderTextColor="white" value={username} onChangeText={setUsername}  />
                </View>

                <View style={styles.inputLabelContainer}>
                    <Text style={{ fontSize: 25, color: "#F8F8FF" }}>Password</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Password..."
                               placeholderTextColor="white" value={password} onChangeText={setPassword} secureTextEntry />
                </View>
            </View>

            <View style={styles.formSubmitContainer}>
                <View style={styles.signInContainer}>
                    <Pressable style={ ({pressed}) => [
                        {
                            backgroundColor: pressed ? "#ff3333" : "#007AFF",
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingVertical: 15,
                            width: "50%"
                        }
                    ]} onPress={() => signIn({username, password}) } >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </Pressable>
                </View>

                <View style={styles.registerContainer}>
                    <Pressable style={ ({pressed}) => [
                        {
                            backgroundColor: pressed ? "#ff3333" : "#007AFF",
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingVertical: 15,
                            width: "50%"
                        }
                    ]} onPress={() => signUp({username, password}) }>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    );
}

// render Home Page
function RenderHome({navigation}) {
    const { signOut } = React.useContext(AuthContext); // initialize and set signOut variable to React context function
    return(
        <Home signOut={signOut} navigation={navigation} />
    );
}

const Stack = createNativeStackNavigator(); // create Navigator stack to navigate between pages
CreateDatabase(); // if not exists

export default function App({ navigation }) {
    // initialize state of application and dispatch page handler
  const [state, dispatch] = React.useReducer(
      (prevState, action) => {
          switch (action.type) {
              case 'RESTORE_TOKEN':
                  return { // if Already logged in
                      ...prevState,
                      userToken: action.token,
                      isLoading: false,
                  };
              case 'SIGN_IN':
                  return{ // if Sign In is requested
                      ...prevState,
                      userToken:action.token,
                  }
              case 'SIGN_OUT':
                  return{ // if Sign out is requested
                      ...prevState,
                      userToken: "",
                  }
          }
      },
      {
          isLoading: true,
          userToken: "",
      }
  );

  // On page load
  React.useEffect(() => {
      const bootstrapAsync = async () => {
          let userToken;

          try{
              userToken = await SecureStore.getItemAsync('userToken'); // retrieve userID token from Secure Store
          } catch (e) {
              console.log(e);
          }
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };

      bootstrapAsync();
  }, []);


  const authContext = React.useMemo(
      () => ({
          signIn: (data) => { // sign in function
              const [username, password] = [data.username, data.password]; // set username, password to passed paramater values

              // database query to sign in user
              const db =  SQLite.openDatabase("videotest3.db");
              db.transaction(tx => {
                  tx.executeSql(
                      'SELECT user_id FROM Users WHERE user_name = (?) AND user_password = (?)',
                      [username, password],
                      async (txObj, results) => {
                          if ( results.rows._array.length > 0 ){
                              const token = String(results.rows._array[0].user_id);
                              // Update Secure Storage user token to userID
                              SaveToken("userToken", token).then(
                                  dispatch({ type: "SIGN_IN", token: token }) // update app state to sign in with token var
                              );
                          }
                          else {
                              alert("User Details Not Found");
                          }
                      },
                      (transaction, error) => {console.log(error)},
                  );
              });
          },
          signOut: async () => { // sign out function
              // reset user token
              SaveToken("userToken", "").then(
                  dispatch({ type: "SIGN_OUT" }) // update app state to sign out
              );
          },
          signUp: (data) => { // sign up function
              const [username, password] = [data.username, data.password]; // set username, password to passed paramater values
              if ( username.length < 3 || password.length < 6) { // validation
                  alert("Invalid Credentials Entered\nUsernames must be at least 3 characters long\nPasswords must be at least 6 characters long");
              }
              else {
                  const db =  SQLite.openDatabase("videotest3.db");
                  Register(username, password);

                  db.transaction(tx => {
                      tx.executeSql(
                          'SELECT user_id FROM Users WHERE user_name = (?) AND user_password = (?)',
                          [username, password],
                          async (txObj, results) => {
                              if ( results.rows._array.length > 0 ){
                                  const token = String(results.rows._array[0].user_id);
                                  // Update Secure Storage user token to userID
                                  SaveToken("userToken", token).then(
                                      dispatch({ type: "SIGN_IN", token: token }) // update app state to sign in once user created with token var
                                  );
                              }
                              else {
                                  alert("User Details Not Found");
                              }
                          },
                          (transaction, error) => {console.log(error)},
                      );
                  });
              }
          },
      }),
      []
  );

  return (
      <AuthContext.Provider value={authContext}>
          <NavigationContainer style={styles.container}>
              <StatusBar barStyle="light-content" />
              <Stack.Navigator>
                  {state.userToken === null || state.userToken === "" ? (
                      <Stack.Screen options={({route}) => ({
                          title: "Login",
                          headerStyle: headerStyle,
                          headerTintColor: "#fff"
                      })} name="Login" component={RenderSignIn} />
                  ): (
                      <Stack.Screen options={({route}) => ({
                          title: "Home",
                          headerStyle: headerStyle,
                          headerTintColor: "#fff"
                      })} name="Home" component={RenderHome} />
                  )}
                  <Stack.Screen options={({route}) => ({
                      title: "Upload Page",
                      headerStyle: headerStyle,
                      headerTintColor: '#fff'
                  })} name="Upload" component={Upload} />
                  <Stack.Screen options={({route}) => ({
                      title: "",
                      headerStyle: headerStyle,
                      headerTintColor: '#fff'
                  })} name="Post" component={Post} />
              </Stack.Navigator>
          </NavigationContainer>
      </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#393E42"
    },
    titleContainer : {
        alignItems: "center",
        paddingVertical: 20
    },
    formContainer: {
        marginVertical: 10
    },
    inputLabelContainer: {
        alignItems: "center",
        paddingVertical: 10,
        marginVertical: 5
    },
    inputContainer: {
        alignItems: "center",
        marginVertical: 5,
    },
    input: {
        height: 50,
        width: "80%",
        backgroundColor: "#303337",
        padding: 5,
        color: "white",
        borderWidth: 1,
        borderRadius: 10
    },
    formSubmitContainer: {
        flexDirection: "row",
        marginVertical: 40,
        marginHorizontal: 20
    },
    signInContainer: {
        width: "50%",
        alignItems: "center"
    },
    registerContainer: {
        width: "50%",
        alignItems: "center"
    },
    buttonText: {
        textAlign: "center",
        color: "white"
    }
});

const headerStyle = {
  backgroundColor: "#393E42"
}
