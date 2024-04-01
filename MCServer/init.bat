cd C:\Users\Marcos\Documents\GitHub\MeteorCraftServer
java -Xmx8G -Xms8G -XX:+UseG1GC -XX:ParallelGCThreads=8 -XX:+UseCompressedOops -XX:+UseStringDeduplication -XX:CICompilerCount=4 -XX:+UseLargePages -XX:+UseNUMA -XX:+UseNUMAInterleaving -XX:+UseBiasedLocking -XX:+AggressiveOpts -jar kcauldron.jar nogui
pause