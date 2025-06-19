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

**Zadanie 6** Testy

:white_check_mark: Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium
(Kotlin, Python, Java, JS, Go, Scala) [Commit](https://github.com/ga1ile0/e-biznes/commit/b4c7d79e937d8da3874dd51b617561d054d81033) </br>

:white_check_mark: 3.5 Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50
asercji [Commit](https://github.com/ga1ile0/e-biznes/commit/f8cf278c3321cab4022b5f9ce92dc66b7ef59a19) </br>

:white_check_mark: 4.0 Należy stworzyć testy jednostkowe do wybranego wcześniejszego
projektu z minimum 50 asercjami [Commit](https://github.com/ga1ile0/e-biznes/commit/cc28abdb7e11444e6af116d0a5f0a69a6c7891b8) </br>

:white_check_mark: 4.5 Należy dodać testy API, należy pokryć wszystkie endpointy z
minimum jednym scenariuszem negatywnym per endpoint [Commit](https://github.com/ga1ile0/e-biznes/commit/ede05e0ec6f5457017ad9e0237e77e1282c61856) </br>

:x: 5.0 Należy uruchomić testy funkcjonalne na Browserstacku

[Kod](https://github.com/ga1ile0/e-biznes/tree/main/ebiznes-zadanie6) <br/>
[Demo](https://github.com/ga1ile0/e-biznes/blob/main/demos/zadanie6_demo.mp4) <br/>


**Zadanie 7** Sonar

Link to the scanned repository: [Link](https://github.com/ga1ile0/test-repo)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ga1ile0_test-repo&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ga1ile0_test-repo)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ga1ile0_test-repo&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ga1ile0_test-repo)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ga1ile0_test-repo&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ga1ile0_test-repo)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ga1ile0_test-repo&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ga1ile0_test-repo)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ga1ile0_test-repo&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ga1ile0_test-repo)

:white_check_mark: 3.0 Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w hookach gita [commit](https://github.com/ga1ile0/test-repo/commit/bfc8355733c82dbe1c4f9c1f04bf71aa10af9d95) </br>

:white_check_mark: 3.5 Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod aplikacji serwerowej) 
(wszystkie bugi są w aplikacji klienckiej) [Commit](https://github.com/ga1ile0/test-repo/commit/4e884fd113190153092c9daa5205b7bf3648c804) </br>

:white_check_mark: 4.0 Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod
aplikacji serwerowej) (brak zapaszków w aplikacji serwerowej, wszystkie są w klienckiej) </br>

:white_check_mark: 4.5 Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa
w kodzie w Sonarze (kod aplikacji serwerowej) (ponownie, wszystkie są w aplikacji klienckiej) </br>

:x: 5.0 Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie
aplikacji klienckiej </br>

**Zadanie 8** Oauth2

:white_check_mark: 3.0 logowanie przez aplikację serwerową (bez Oauth2) [commit](https://github.com/ga1ile0/e-biznes/commit/ed88aee914fc162efa97e728a71355f1e62936b4) </br>

:white_check_mark: 3.5 rejestracja przez aplikację serwerową (bez Oauth2) [commit](https://github.com/ga1ile0/e-biznes/commit/d5d318a99770c0fa2f7810b3096bbd45e5b986fd) </br>

:white_check_mark: 4.0 logowanie via Google OAuth2 [commit](https://github.com/ga1ile0/e-biznes/commit/032e2472df307cbc332205a0b260a547e1586b35) </br>

:x: 4.5 logowanie via Facebook lub Github OAuth2 </br>

:x: 5.0 zapisywanie danych logowania OAuth2 po stronie serwera </br>

[Kod](https://github.com/ga1ile0/e-biznes/tree/main/ebiznes-zadanie8) </br>

**Zadanie 10** Chmura/CI
:white_check_mark: 3.0 Należy stworzyć odpowiednie instancje po stronie chmury na
dockerze [commit](https://github.com/ga1ile0/e-biznes/commit/055e316389f27243f9e145494e99eb7b6bc37cac)
Link do strony (załadowanie może chwile trwać ze względu na darmową wersje): https://e-biznes-zadanie10-frontend.onrender.com/ </br>
:white_check_mark: 3.5 Stworzyć odpowiedni pipeline w Github Actions do budowania
aplikacji (np. via fatjar) [commit](https://github.com/ga1ile0/e-biznes/commit/6c189ca2301311e0d34a5f6272d497c3ac653518) </br>
:x: 4.0 Dodać notyfikację mailową o zbudowaniu aplikacji </br>
:x: 4.5 Dodać krok z deploymentem aplikacji serwerowej oraz klienckiej na
chmurę </br>
:x: 5.0 Dodać uruchomienie regresyjnych testów automatycznych
(funkcjonalnych) jako krok w Actions </br>



