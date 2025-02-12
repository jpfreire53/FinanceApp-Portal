import forge from 'node-forge';
const publicKeyPem = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxMGWU/LcWXpnhnJ5+tni
mhgRdtGvt8A6tamLWBialBe8u+zOvc47BB7FJ8tsEX3dHC8J2gBwHSgiZoFCUP8S
mbSO3F3WkqwVxoY5j11dZyKP2lrCsVldISCfnoZIUdt/oEe/1br3TWVPrLWfkldW
iVkSHb5LZrVkHwS7RJsDnJwp4f46LgA7L4oNQlnZ02htBVSdvvnnkcpUpqz+qgFM
XGyTwMBr1fUBkXmbMtTud0yFC89NyT9DLFa7TdmTd6yx33tMWeo/wzx9vy/ERTQA
ybryNMJkoTSNn4YQiEo5tUFksGZ1zUYnrsITZ3NULMvUrAxRciELfvBmUf6qtBxM
4QIDAQAB
-----END PUBLIC KEY-----
`;

const Utils = {
    formatCurrency: (value: any) => {
        const formatted = value
            .replace(/\D/g, '')
            .replace(/(\d)(\d{2})$/, '$1,$2') 
            .replace(/(?=(\d{3})+(\D))\B/g, '.') 
        return `R$ ${formatted}`;
      },

      formattedValue: (value: number) => {
        return (value * 1).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    },

    encryptData: function (data: any) {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const jsonString = JSON.stringify(data);
        const encrypted = publicKey.encrypt(forge.util.encodeUtf8(jsonString), 'RSA-OAEP');
        return forge.util.encode64(encrypted);
    },

    verifyPassword: function (password: string) {
        const specialTest = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const numTest = /[0-9]/.test(password);
        const upperTest = /[A-Z]/.test(password);
        const lowerTest = /[a-z]/.test(password);

        if (password.length < 8) {
            return {success: false, message: "A senha informada tem que ser maior que 8 caracteres."}
        }
        if (!specialTest) {
            return {success: false, message: "A senha informada tem que ter pelo menos 1 caracter especial."}
        }
        if (!numTest) {
            return {success: false, message: "A senha tem que conter números"}
        }
        if (!upperTest) {
            return {success: false, message: "A senha informada tem que ter pelo menos 1 letra maiúscula."}
        }
        if (!lowerTest) {
            return {success: false, message: "A senha informada tem que ter pelo menos 1 letra minúscula."}
        }
        if (password == "password") {
            return {success: false, message: "A senha é muito comum."}
        }

        return {success: true, message: "Usuário criado com sucesso."}
    }

}

export default Utils;