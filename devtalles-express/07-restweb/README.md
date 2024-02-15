## clave privada y publica
Para poder utilizar http2 es necesario tener un certificado y una clave privada. Para generarlos se puede utilizar openssl.

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
## o
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```