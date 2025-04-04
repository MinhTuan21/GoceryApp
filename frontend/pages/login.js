import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons';
import { Checkbox } from "react-native-paper";
import authApi from "../public/src/api/authApi";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        setError("");

        if (!email || !password) {
            setError("Vui lòng nhập email và mật khẩu.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Email không hợp lệ.");
            return;
        }

        if (password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        try {
            const response = await authApi.login(email, password);
            if (response?.token) {
                await AsyncStorage.setItem("token", response.token);
                if (rememberMe) {
                    await AsyncStorage.setItem("rememberMe", email);
                }
                navigation.navigate("HomeScreen");
            } else {
                setError(response?.message || "Đăng nhập thất bại!");
            }
        } catch (error) {
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
                    <FontAwesome
                        name={secureText ? "eye-slash" : "eye"}
                        size={20}
                        color="#666"
                    />
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
                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <Text style={styles.forgotPasswordText}>Hoặc</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="facebook" size={30} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesome name="google" size={30} color="#db4437" />
                </TouchableOpacity>
            </View>

            <Text style={styles.signupText}>
                Bạn chưa có tài khoản? {" "}
                <Text style={styles.signupLink} onPress={() => navigation.navigate("RegisterScreen")}>
                    Tạo tài khoản
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333"
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    passwordInput: {
        flex: 1,
        height: 50,
    },
    rememberForgotContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#2ecc71",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    errorText: {
        color: "red",
        marginBottom: 10
    },
    forgotPasswordText: {
        color: "#666"
    },
    signupText: {
        marginTop: 20,
        color: "#333"
    },
    signupLink: {
        color: "#3498db",
        fontWeight: "bold"
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
        alignItems: "center"
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    }
});

export default LoginScreen;