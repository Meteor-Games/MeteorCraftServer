# Use a imagem do Ubuntu 20.04 como base
FROM ubuntu:20.04

# Informa o mantenedor da imagem
LABEL maintainer="Seu Nome <seu@email.com>"

# Atualiza os repositórios e instala as dependências necessárias
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk wget && \
    rm -rf /var/lib/apt/lists/*

# Cria um diretório para o servidor de Minecraft
RUN mkdir /minecraft

# Define o diretório de trabalho
WORKDIR /minecraft

# Baixa o servidor de Minecraft e renomeia para 'server.jar'
RUN wget -O server.jar https://cdn.getbukkit.org/craftbukkit/craftbukkit-1.17.1.jar

# Copia o arquivo de configuração 'eula.txt' para aceitar os termos de uso
COPY eula.txt eula.txt

# Expõe a porta 25565 para acesso ao servidor Minecraft
EXPOSE 25565

# Comando para iniciar o servidor de Minecraft
CMD ["java", "-Xmx8G", "-Xms8G", "-XX:+UseNUMA", "-XX:+UseBiasedLocking", "-XX:+AggressiveOpts", "-XX:+UseNUMAInterleaving" ,"-XX:+UseG1GC", "","-XX:+UseLargePages", "-XX:CICompilerCount=4" ,"-XX:+UseStringDeduplication" , "-XX:ParallelGCThreads=8", "-XX:+UseCompressedOops", "-jar", "kcauldron.jar", "nogui"]
