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
    }

}

export default Utils;