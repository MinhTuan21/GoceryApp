import React, { useState, useEffect } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons';
import { Checkbox } from "react-native-paper";
import authApi from "../public/src/api/authApi";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest as useFacebookAuthRequest } from "expo-auth-session/providers/facebook";
import { useAuthRequest as useGoogleAuthRequest } from "expo-auth-session/providers/google";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

import { getAnalytics, isSupported } from "firebase/analytics"; 

import { ResponseType } from "expo-auth-session";
import { makeRedirectUri } from "expo-auth-session";
import { auth } from "./firebaseConfig";



//AIzaSyCCQOvrnh7ofD4zsQUXGaWJKkaozTgs56Q
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    // Facebook Login
    const [fbRequest, fbResponse, fbPromptAsync] = useFacebookAuthRequest({
        clientId: "640473735414527",
        scopes: ["public_profile", "email"],
        redirectUri: makeRedirectUri({
            useProxy: true,
        }),
    });

    // Google Login
    const [googleRequest, googleResponse, googlePromptAsync] = useGoogleAuthRequest({
        expoClientId: "424180852220-de2l7jr3l9jj2v4ijo5rjsnvht6iskc5.apps.googleusercontent.com",
        androidClientId: "424180852220-uoqei357va4qdqnv568cm7pp4t4f1no6.apps.googleusercontent.com", //751787958972-edf14q7v5lv7iv87lf7sek7vanam127p.apps.googleusercontent.com //new
        webClientId: "424180852220-4efji1om9tdt6donq46td99orrpoetob.apps.googleusercontent.com",
        responseType: ResponseType.Token,
        redirectUri: makeRedirectUri({ useProxy: true }),
      });

    useEffect(() => {
        const handleFacebookLogin = async () => {
            if (fbResponse?.type === "success") {
                const { access_token } = fbResponse.params;
                const userRes = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${access_token}`);
                const userInfo = await userRes.json();
                await AsyncStorage.setItem("fb_user", JSON.stringify(userInfo));
                navigation.navigate("HomeScreen");
            } else if (fbResponse?.type === "error") {
                setError("Đăng nhập Facebook thất bại.");
            }
        };

        handleFacebookLogin();
    }, [fbResponse]);

    useEffect(() => {
        if (googleResponse?.type === "success") {
          const { id_token } = googleResponse.authentication;
          const credential = GoogleAuthProvider.credential(id_token);
          
          signInWithCredential(auth, credential)
            .then((userCredential) => {
              console.log("Đăng nhập Google thành công:", userCredential.user);
              navigation.navigate("HomeScreen");
            })
            .catch((err) => {
              console.error("Đăng nhập thất bại", err);
              setError("Đăng nhập Google thất bại.");
            });
        } else if (googleResponse?.type === "error") {
          setError("Đăng nhập Google thất bại.");
        }
      }, [googleResponse]);
      
    useEffect(() => {
        const loadRememberedEmail = async () => {
          const savedEmail = await AsyncStorage.getItem("rememberMe");
          if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
          }
        };
        loadRememberedEmail();
      }, []);
      const handleForgotPassword = () => {
        navigation.navigate("ForgotPasswordScreen");  
      };
    const validateInput = () => {
        if (!email.trim() || !password.trim()) return "Vui lòng nhập email và mật khẩu.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Email không hợp lệ.";
        if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
        return "";
    };

    const handleLogin = async () => {
        const validationError = validateInput();
        if (validationError) return setError(validationError);

        try {
            const res = await authApi.login(email, password);
            console.log(res)
            if (res?.token) {
                await AsyncStorage.setItem("token", res.token);
                if (rememberMe) await AsyncStorage.setItem("rememberMe", email);
                navigation.navigate("HomeScreen");
            } else setError(res?.message || "Đăng nhập thất bại!");
        } catch {
            setError("Có lỗi xảy ra khi đăng nhập.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/login.png")} style={styles.backgroundImage} />
            <Text style={styles.title}>Chào mừng bạn</Text>
            <Text style={styles.subtitle}>Đăng nhập tài khoản</Text>

            <TextInput
                style={styles.input}
                placeholder="Nhập email hoặc số điện thoại"
                value={email}
                onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Mật khẩu"
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <FontAwesome name={secureText ? "eye-slash" : "eye"} size={20} color="#666" />
                </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.rememberForgotContainer}>
                <View style={styles.rememberMeContainer}>
                    <Checkbox
                        status={rememberMe ? 'checked' : 'unchecked'}
                        onPress={() => setRememberMe(!rememberMe)}
                    />
                    <Text style={styles.rememberPasswordText}>Nhớ mật khẩu</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <Text style={styles.forgotPasswordText}>Hoặc</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => fbPromptAsync()}>
                    <FontAwesome name="facebook" size={30} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => googlePromptAsync()}>
                    <FontAwesome name="google" size={30} color="#db4437" />
                </TouchableOpacity>
            </View>

            <Text style={styles.signupText}>
                Bạn chưa có tài khoản?{" "}
                <Text style={styles.signupLink} onPress={() => navigation.navigate("RegisterScreen")}>
                    Tạo tài khoản
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center", alignItems: "center",
        padding: 20, backgroundColor: "#fff"
    },
    title: { fontSize: 26, fontWeight: "bold", color: "#333" },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
    input: {
        width: "100%", height: 50, borderWidth: 1, borderColor: "#ddd",
        borderRadius: 8, paddingHorizontal: 15, marginBottom: 15
    },
    passwordContainer: {
        flexDirection: "row", alignItems: "center", width: "100%",
        borderWidth: 1, borderColor: "#ddd", borderRadius: 8,
        paddingHorizontal: 15, marginBottom: 15
    },
    passwordInput: { flex: 1, height: 50 },
    rememberForgotContainer: {
        flexDirection: "row", justifyContent: "space-between",
        width: "100%", marginBottom: 20
    },
    rememberMeContainer: { flexDirection: "row", alignItems: "center" },
    button: {
        width: "100%", height: 50, backgroundColor: "#2ecc71",
        justifyContent: "center", alignItems: "center", borderRadius: 8
    },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    errorText: { color: "red", marginBottom: 10 },
    forgotPasswordText: { color: "#666" },
    signupText: { marginTop: 20, color: "#333" },
    signupLink: { color: "#3498db", fontWeight: "bold" },
    iconContainer: {
        flexDirection: "row", justifyContent: "center",
        width: "100%", marginBottom: 20, alignItems: "center"
    },
    iconButton: {
        width: 50, height: 50, justifyContent: "center",
        alignItems: "center", marginHorizontal: 10
    }
});

export default LoginScreen;
