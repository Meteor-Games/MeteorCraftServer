# Use a imagem do Alpine Linux como base
FROM alpine:latest

# Informa o mantenedor da imagem
LABEL maintainer="Seu Nome <seu@email.com>"

# Atualiza os repositórios e instala as dependências necessárias
RUN apk update && \
    apk add openjdk8 wget && \
    rm -rf /var/cache/apk/*

# Cria um diretório para o servidor de Minecraft
RUN mkdir /minecraft

# Define o diretório de trabalho
WORKDIR /minecraft
COPY . .
# Copia o arquivo de configuração 'eula.txt' para aceitar os termos de uso
COPY eula.txt eula.txt

# Expõe a porta 25565 para acesso ao servidor Minecraft
EXPOSE 25565

# Comando para iniciar o servidor de Minecraft
CMD ["java", "-Xmx8G", "-Xms8G", "-XX:+UseG1GC", "-XX:ParallelGCThreads=8", "-XX:+UseCompressedOops", "-XX:+UseStringDeduplication", "-XX:CICompilerCount=4", "-XX:+UseBiasedLocking", "-XX:+AggressiveOpts", "-jar", "./KCauldron.jar", "nogui"]
