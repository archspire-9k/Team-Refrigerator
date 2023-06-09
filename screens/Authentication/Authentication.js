import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native"
import { COLORS, SIZES, FONTS, icons, dummyData, images } from "../../constants"

import { Button } from '@rneui/themed';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import 'expo-dev-client'

export const Authentication = ({ navigation }) => {
    GoogleSignin.configure({
        webClientId: '675071634893-vtfk81icgitaf5rchkm1pdfaridehqn1.apps.googleusercontent.com',
    });

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const user_sign_in = auth().signInWithCredential(googleCredential);
        user_sign_in
            .then((user) => {
                console.log("authenticated");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
      
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
      }

    const [pressed1, setPressed1] = React.useState(false);
    const [pressed2, setPressed2] = React.useState(false);
    const [pressed3, setPressed3] = React.useState(false);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 30, backgroundColor: "white" }}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: SIZES.radius,
                    backgroundColor: 'transparent',
                    position: "absolute",
                    left: 30,
                    top: 60
                }}
            >
                <Image
                    source={icons.arrow_back}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                ></Image>
            </TouchableOpacity>

            <Image
                source={{ uri: 'https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg' }}
                style={{
                    width: 250,
                    height: 250,
                    marginTop: 24,
                    borderRadius: 900
                }}
            />


            <Text style={{
                fontSize: 36,
                fontWeight: "bold",
                marginVertical: 20
            }}>Let's get started!</Text>
            <Button
                loading={pressed1 && !pressed2 && !pressed3}
                loadingProps={{
                    size: 'large',
                    color: COLORS.green,
                }}

                onPress={() => {
                    setPressed1(true)
                    setPressed2(false)
                    setPressed3(false)
                    onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))

                }}
                buttonStyle={{
                    backgroundColor: 'transparent',
                    borderColor: COLORS.lightGray1,
                    borderWidth: 1,
                    borderRadius: 15,
                    height: 60,
                }}
                containerStyle={{
                    width: "100%",
                    marginHorizontal: 50,
                    borderRadius: 15,
                    marginVertical: 10,
                }}

            >
                <Image
                    source={icons.facebookIcon}
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10
                    }}
                />
                <Text
                    style={{
                        fontWeight: '700',
                        color: COLORS.black,
                        ...FONTS.h3

                    }}
                >
                    Continue with Facebook
                </Text>
            </Button>

            <Button
                loading={!pressed1 && pressed2 && !pressed3}
                loadingProps={{
                    size: 'large',
                    color: COLORS.green,
                }}

                onPress={(e) => {
                    setPressed1(false)
                    setPressed2(true)
                    setPressed3(false)
                    onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
                }}



                buttonStyle={{
                    backgroundColor: 'transparent',
                    borderColor: COLORS.lightGray1,
                    borderWidth: 1,
                    borderRadius: 15,
                    height: 60,
                }}
                containerStyle={{
                    width: "100%",
                    marginHorizontal: 50,
                    borderRadius: 15,
                    marginVertical: 10,
                }}
            >
                <Image
                    source={icons.googleIcon}
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10
                    }}
                />

                <Text
                    style={{
                        fontWeight: '700',
                        color: COLORS.black,
                        ...FONTS.h3

                    }}
                >
                    Continue with Google
                </Text>
            </Button>

            {Platform.OS === 'ios' &&
                <Button
                    loading={!pressed1 && !pressed2 && pressed3}
                    loadingProps={{
                        size: 'large',
                        color: COLORS.green,
                    }}
                    onPress={() => {
                        setPressed1(false)
                        setPressed2(false)
                        setPressed3(true)
                        console.log("Sign Up With Apple")
                    }}
                    buttonStyle={{
                        backgroundColor: 'transparent',
                        borderColor: COLORS.lightGray1,
                        borderWidth: 1,
                        borderRadius: 15,
                        height: 60,
                    }}
                    containerStyle={{
                        width: "100%",
                        marginHorizontal: 50,
                        borderRadius: 15,
                        marginVertical: 10,
                    }}
                >
                    <Image
                        source={icons.appleIcon}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />

                    <Text
                        style={{
                            fontWeight: '700',
                            color: COLORS.black,
                            ...FONTS.h3

                        }}
                    >
                        Continue with Apple
                    </Text>
                </Button>
            }

            <View
                style={{
                    flexDirection: "row",
                    marginVertical: SIZES.radius,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginVertical: 20
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.lightGray1,
                        height: 1,
                        width: "43%"
                    }}
                >
                </View>
                <Text style={{
                    fontWeight: "bold",
                    color: COLORS.gray,
                    width: "14%",
                    textAlign: "center",
                    ...FONTS.h3
                }}>or</Text>
                <View
                    style={{
                        backgroundColor: COLORS.lightGray1,
                        height: 1,
                        width: "43%"
                    }}
                >

                </View>
            </View>

            <Button
                onPress={() => {
                    navigation.navigate("LogInAccount")
                    console.log("Sign Up With Phone Number")
                }}
                title="Sign in with Phone Number"
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: COLORS.green,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                    height: 60,
                }}
                containerStyle={{
                    width: "100%",
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
            />

            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Text style={{ color: COLORS.gray, fontSize: 17 }}>Don't have account?</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CreateNewAccount")
                        console.log("Sign Up")
                    }}
                >
                    <Text style={{ color: COLORS.green, fontWeight: "bold", fontSize: 17 }}>  Sign up</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}