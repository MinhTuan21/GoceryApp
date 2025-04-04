import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native";
import authApi from "../public/src/api/authApi";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }

        const response = await authApi.register({ name, email, password });

        if (response.success) {
            alert("Đăng ký thành công!");
            navigation.navigate("LoginScreen");
        } else {
            setError(response.message || "Đăng ký thất bại!");
        }
    };

    return (
        <View style={styles.container}>
            
            <Image source={require("../assets/images/register.png")} style={styles.backgroundImage} />

            <Text style={styles.title}>Tạo tài khoản</Text>

            <TextInput
                style={styles.input}
                placeholder="Họ và Tên"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
                Bạn đã có tài khoản?{" "}
                <Text style={styles.loginLink} onPress={() => navigation.navigate("LoginScreen")}>
                    Đăng nhập
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
    backgroundImage: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
        marginBottom: 20,
        borderRadius: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10
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
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#3498db",
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
    loginText: {
        marginTop: 20,
        color: "#333"
    },
    loginLink: {
        color: "#2ecc71",
        fontWeight: "bold"
    }
});

export default RegisterScreen;
