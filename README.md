# e-biznes
Rozwiązania zadań z przedmiotu e-biznes w roku akademickim 2024/2025.


**Zadanie 1** Docker

:white_check_mark: 3.0 obraz ubuntu z Pythonem w wersji 3.10 

:white_check_mark: 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem 

:white_check_mark: 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC 
SQLite w ramach projektu na Gradle (build.gradle) 

:white_check_mark: 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji
przez CMD oraz gradle 

:white_check_mark: 5.0 dodać konfigurację docker-compose 


[Kod](https://github.com/ga1ile0/e-biznes/tree/main/docker-zadanie1) <br/> 
[Image](https://hub.docker.com/r/ga1ile0/ebiznes-zadanie1) <br/> 
[Demo](https://github.com/ga1ile0/e-biznes/blob/main/demos/zadanie1_demo.mp4) <br/> 


**Zadanie 2** aplikacja na frameworku Play w Scali 3.

:white_check_mark: 3.0 Należy stworzyć kontroler do Produktów [Commit](https://github.com/ga1ile0/e-biznes/commit/5e23ff862967d8df19e71d2814f34b4b479aeb12) <br/> 

:white_check_mark: 3.5 Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane
pobierane z listy [Commit](https://github.com/ga1ile0/e-biznes/commit/f29a3cd458abfa7e9c218264b86486696954db04) <br/>

:white_check_mark: 4.0 Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy
zgodnie z CRUD [Commit](https://github.com/ga1ile0/e-biznes/commit/0a8931d7bbbc2f6de39ea2b756f617da8ef66f23) <br/>

:x: 4.5 Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać
skrypt uruchamiający aplikację via ngrok  <br/>

:x: 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD  <br/>


[Kod](https://github.com/ga1ile0/e-biznes/tree/main/docker-zadanie2) <br/>
[Demo](https://github.com/ga1ile0/e-biznes/blob/main/demos/zadanie2_demo.mp4) <br/>

**Zadanie 3** Discord bot

:white_check_mark: 3.0 Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor,
która pozwala na przesyłanie wiadomości na platformę Discord [Commit](https://github.com/ga1ile0/e-biznes/commit/3eb0fd11c89f74e077bccdd95c8d36f0ce3bfd73) </br>

:white_check_mark: 3.5 Aplikacja jest w stanie odbierać wiadomości użytkowników z
platformy Discord skierowane do aplikacji (bota) [Commit](https://github.com/ga1ile0/e-biznes/commit/46d28cc55bcc6910292223b5981404bc021562bc) </br>

:white_check_mark: 4.0 Zwróci listę kategorii na określone żądanie użytkownika [Commit](https://github.com/ga1ile0/e-biznes/commit/417c685c631eb1ae80db460620cec8e69682b3ce) </br>

:white_check_mark: 4.5 Zwróci listę produktów wg żądanej kategorii [Commit](https://github.com/ga1ile0/e-biznes/commit/4b7b7dc1f0172b00649190fe0970e7d37bfcdffd) </br>

:x: 5.0 Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger,
Webex

[Kod](https://github.com/ga1ile0/e-biznes/tree/main/ebiznes-zadanie3) <br/>
[Demo](https://github.com/ga1ile0/e-biznes/blob/main/demos/zadanie3_demo.mp4) <br/>

**Zadanie 4** Go

:white_check_mark: 3.0 Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD [Commit](https://github.com/ga1ile0/e-biznes/commit/59f1fae95aae16ded40d5ebedf8aef1c8ca296f2) </br>

:white_check_mark: 3.5 Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy) [Commit](https://github.com/ga1ile0/e-biznes/commit/81026f894e52e22f5a8431df9e41e484cbf6b13e) </br>

:white_check_mark: 4.0 Należy dodać model Koszyka oraz dodać odpowiedni endpoint [Commit](https://github.com/ga1ile0/e-biznes/commit/bb52cae034a01238edc5c7ce490ab7329a9059f3) </br>

:white_check_mark: 4.5 Należy stworzyć model kategorii i dodać relację między kategorią, a produktem [Commit](https://github.com/ga1ile0/e-biznes/commit/d413ca1b0ea84aedede7be7da60634865d18d624) </br>

:white_check_mark: 5.0 pogrupować zapytania w gorm’owe scope'y [Commit](https://github.com/ga1ile0/e-biznes/commit/f155713f1bb2ad645c8df92dd93decc97b9024d1) </br>

[Kod](https://github.com/ga1ile0/e-biznes/tree/main/ebiznes-zadanie4) <br/>
[Demo](https://github.com/ga1ile0/e-biznes/blob/main/demos/zadanie4_demo.mp4) <br/>


**Zadanie 5** Frontend

:white_check_mark: 3.0 W ramach projektu należy stworzyć dwa komponenty: Produkty oraz
Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w
Produktach powinniśmy pobierać dane o produktach z aplikacji
serwerowej; [Commit](https://github.com/ga1ile0/e-biznes/commit/b66a77786f0bc4bc170db994f5613d5db879b9cb) </br>

:white_check_mark: 3.5 Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing [Commit](https://github.com/ga1ile0/e-biznes/commit/6e3557cc9cf280230fbb145c146b26af0ea98aa2) </br>

:white_check_mark: 4.0 Dane pomiędzy wszystkimi komponentami powinny być przesyłane za
pomocą React hooks [Commit](https://github.com/ga1ile0/e-biznes/commit/aa13a0d7c4b19e7787d6525acc7e54edd4741188) </br>

:x: 4.5 Należy dodać skrypt uruchamiający aplikację serwerową oraz
kliencką na dockerze via docker-compose

:x: 5.0 Należy wykorzystać axios’a oraz dodać nagłówki pod CORS

[Kod](https://github.com/ga1ile0/e-biznes/tree/main/ebiznes-zadanie5) <br/>
[Demo](https://github.com/ga1ile0/e-biznes/blob/main/demos/zadanie5_demo_compr.mp4) <br/>

