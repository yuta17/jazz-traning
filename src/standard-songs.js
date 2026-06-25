(function attachStandardSongs(global) {
  "use strict";

  const STANDARD_SONGS = [
  {
    "title": "9.20 Special",
    "composer": "Warren Earl"
  },
  {
    "title": "26-2",
    "composer": "Coltrane John"
  },
  {
    "title": "52nd Street Theme",
    "composer": "Monk Thelonious"
  },
  {
    "title": "500 Miles High",
    "composer": "Corea Chick"
  },
  {
    "title": "502 Blues",
    "composer": "Rowles Jimmy"
  },
  {
    "title": "A Ballad",
    "composer": "Mulligan Gerry"
  },
  {
    "title": "A Beautiful Friendship",
    "composer": "Kahn Donald"
  },
  {
    "title": "A Blossom Fell",
    "composer": "Barnes-Cornelius"
  },
  {
    "title": "A Certain Smile",
    "composer": "Fain-Webster"
  },
  {
    "title": "A Child Is Born",
    "composer": "Jones Thad"
  },
  {
    "title": "A Felicidade",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "A Fine Romance",
    "composer": "Kern Jerome"
  },
  {
    "title": "A Flower Is A Lovesome Thing",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "A Foggy Day",
    "composer": "Gershwin George"
  },
  {
    "title": "A Ghost Of A Chance",
    "composer": "Young Victor"
  },
  {
    "title": "A Kiss To Build A Dream On",
    "composer": "Kalmar-Ruby-Hammerstein"
  },
  {
    "title": "A Little Tear",
    "composer": "Deodato-Valle"
  },
  {
    "title": "A Lovely Way To Spend An Evening",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "A Night In Tunisia",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "A Nightingale Sang In Berkeley Square",
    "composer": "Sherwin Manning"
  },
  {
    "title": "A Pretty Girl Is Like A Melody",
    "composer": "Berlin Irving"
  },
  {
    "title": "A Shade Of Jade",
    "composer": "Henderson Joe"
  },
  {
    "title": "A Sleepin' Bee",
    "composer": "Arlen Harold"
  },
  {
    "title": "A Smooth One",
    "composer": "Goodman Benny"
  },
  {
    "title": "A Sound For Sore Ears",
    "composer": "Heath Jimmy"
  },
  {
    "title": "A Sunday Kind Of Love",
    "composer": "Belle-Prima-Leonard-Rhodes"
  },
  {
    "title": "A Taste Of Honey",
    "composer": "Marlow-Scott"
  },
  {
    "title": "A Time For Love",
    "composer": "Mandel Johnny"
  },
  {
    "title": "A Tisket A Tasket",
    "composer": "Traditional"
  },
  {
    "title": "A Weaver Of Dreams",
    "composer": "Young Victor"
  },
  {
    "title": "A Wonderful Day Like Today",
    "composer": "Bricusse-Newley"
  },
  {
    "title": "Ablution",
    "composer": "Tristano Lennie"
  },
  {
    "title": "Ac-Cent-Tchu-Ate The Positive",
    "composer": "Arlen Harold"
  },
  {
    "title": "Across The Alley From The Alamo",
    "composer": "Greene Joe"
  },
  {
    "title": "Adam's Apple",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Affirmation",
    "composer": "Feliciano José"
  },
  {
    "title": "African Flower",
    "composer": "Ellington Duke"
  },
  {
    "title": "African Queen, The",
    "composer": "Silver Horace"
  },
  {
    "title": "Afro Blue",
    "composer": "Santamaria Mongo"
  },
  {
    "title": "Afro Centric",
    "composer": "Henderson Joe"
  },
  {
    "title": "After You",
    "composer": "Porter Cole"
  },
  {
    "title": "After You've Gone",
    "composer": "Creamer Henry"
  },
  {
    "title": "Afternoon In Paris",
    "composer": "Lewis John"
  },
  {
    "title": "Again",
    "composer": "Newman Lionel"
  },
  {
    "title": "Agua De Beber",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Ahmid-6",
    "composer": "Metheny Pat"
  },
  {
    "title": "Ain't Misbehavin'",
    "composer": "Waller Fats"
  },
  {
    "title": "Ain't She Sweet",
    "composer": "Ager Milton"
  },
  {
    "title": "Airegin",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Airmail Special",
    "composer": "Christian Charlie"
  },
  {
    "title": "Aisha",
    "composer": "Tyner McCoy"
  },
  {
    "title": "Alexander's Ragtime Band",
    "composer": "Berlin Irving"
  },
  {
    "title": "Alfie",
    "composer": "Bacharach Burt"
  },
  {
    "title": "Alfie's Theme",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Alice In Wonderland",
    "composer": "Fain Sammy"
  },
  {
    "title": "All About Ronnie",
    "composer": "Greene Joe"
  },
  {
    "title": "All Alone",
    "composer": "Berlin Irving"
  },
  {
    "title": "All At Once You Love Her",
    "composer": "Rodgers-Hammerstein"
  },
  {
    "title": "All Blues",
    "composer": "Davis Miles"
  },
  {
    "title": "All By Myself",
    "composer": "Berlin Irving"
  },
  {
    "title": "All God's Chillun Got Rhythm",
    "composer": "Kahn-Kaper"
  },
  {
    "title": "All My Tomorrows",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "All Of A Sudden My Heart Sings",
    "composer": "Herpin-Jamblan-Rome"
  },
  {
    "title": "All Of Me",
    "composer": "Marks Gerald"
  },
  {
    "title": "All Of You",
    "composer": "Porter Cole"
  },
  {
    "title": "All Or Nothing At All",
    "composer": "Altman Arthur"
  },
  {
    "title": "All The Things You Are",
    "composer": "Kern Jerome"
  },
  {
    "title": "All The Way",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "All Through The Day",
    "composer": "Kern-Hammerstein"
  },
  {
    "title": "All Through The Night",
    "composer": "Porter Cole"
  },
  {
    "title": "All Too Soon",
    "composer": "Ellington Duke"
  },
  {
    "title": "Almost Like Being In Love",
    "composer": "Loewe Frederick"
  },
  {
    "title": "Alone Together",
    "composer": "Schwartz Arthur"
  },
  {
    "title": "Alone Too Long",
    "composer": "Schwartz Arthur"
  },
  {
    "title": "Along Came Betty",
    "composer": "Golson Benny"
  },
  {
    "title": "Always",
    "composer": "Berlin Irving"
  },
  {
    "title": "Always And Forever",
    "composer": "Metheny Pat"
  },
  {
    "title": "Am I Blue?",
    "composer": "Akst Harry"
  },
  {
    "title": "Among My Souvenirs",
    "composer": "Nicholls Horatio"
  },
  {
    "title": "Ana Maria",
    "composer": "Shorter Wayne"
  },
  {
    "title": "And On The Third Day",
    "composer": "Gibbs Michael"
  },
  {
    "title": "And The Angels Sing",
    "composer": "Elman Ziggy"
  },
  {
    "title": "And What If I Don't",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Angel Eyes",
    "composer": "Dennis Matt"
  },
  {
    "title": "Anthropology",
    "composer": "Parker Charlie"
  },
  {
    "title": "Anything Goes",
    "composer": "Porter Cole"
  },
  {
    "title": "April",
    "composer": "Tristano Lennie"
  },
  {
    "title": "April In Paris",
    "composer": "Duke Vernon"
  },
  {
    "title": "April Joy",
    "composer": "Metheny Pat"
  },
  {
    "title": "April Skies",
    "composer": "Collette Buddy"
  },
  {
    "title": "Aren't You Glad You're You",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Armageddon",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Armando's Rhumba",
    "composer": "Corea Chick"
  },
  {
    "title": "As Long As I Live",
    "composer": "Arlen Harold"
  },
  {
    "title": "As Time Goes By",
    "composer": "Hupfeld Herman"
  },
  {
    "title": "Ask Me Now",
    "composer": "Monk Thelonious"
  },
  {
    "title": "At Last",
    "composer": "Warren Harry"
  },
  {
    "title": "At Long Last Love",
    "composer": "Porter Cole"
  },
  {
    "title": "Au Privave",
    "composer": "Parker Charlie"
  },
  {
    "title": "Autumn In New York",
    "composer": "Duke Vernon"
  },
  {
    "title": "Autumn Leaves",
    "composer": "Kosma Joseph"
  },
  {
    "title": "Autumn Nocturne",
    "composer": "Gannon-Myrow"
  },
  {
    "title": "Avalon",
    "composer": "Jolson-Sylva-Rose"
  },
  {
    "title": "Ba-lue Bolivar Ba-lues-are",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Baby, Won't You Please Come Home",
    "composer": "Warfield-Williams"
  },
  {
    "title": "Background Music",
    "composer": "Marsh Warne"
  },
  {
    "title": "Backstage Sally",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Backward Step, The",
    "composer": "Payton Nicholas"
  },
  {
    "title": "Bags and Trane",
    "composer": "Jackson Milt"
  },
  {
    "title": "Bags' Groove",
    "composer": "Jackson Milt"
  },
  {
    "title": "Balance, The",
    "composer": "Holland Dave"
  },
  {
    "title": "Ballad For Very Tired And Very Sad Lotus Eaters",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Ballade",
    "composer": "Parker Charlie"
  },
  {
    "title": "Baltimore Oriole",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Barbados",
    "composer": "Parker Charlie"
  },
  {
    "title": "Barbara",
    "composer": "Silver Horace"
  },
  {
    "title": "Bark For Barksdale",
    "composer": "Mulligan Gerry"
  },
  {
    "title": "Basin Street Blues",
    "composer": "Williams Spencer"
  },
  {
    "title": "Bat, The",
    "composer": "Metheny Pat"
  },
  {
    "title": "Baubles, Bangles and Beads",
    "composer": "Borodin-Wright-Forrest"
  },
  {
    "title": "Be Careful It's My Heart",
    "composer": "Berlin Irving"
  },
  {
    "title": "Be My Love",
    "composer": "Brodszky Nikolaus"
  },
  {
    "title": "Be-Bop",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "Bean And The Boys",
    "composer": "Hawkins Coleman"
  },
  {
    "title": "Beatrice",
    "composer": "Rivers Sam"
  },
  {
    "title": "Beautiful Love",
    "composer": "Young Victor"
  },
  {
    "title": "Beauty And The Beast",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Begin The Beguine",
    "composer": "Porter Cole"
  },
  {
    "title": "Bein' Green",
    "composer": "Raposo Joe"
  },
  {
    "title": "Bellarosa",
    "composer": "Hope Elmo"
  },
  {
    "title": "Bemsha Swing",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Benny's Tune",
    "composer": "Loueke Lionel"
  },
  {
    "title": "Bernie's Tune",
    "composer": "Miller Bernie"
  },
  {
    "title": "Besame Mucho",
    "composer": "Velazques Consuelo"
  },
  {
    "title": "Bess You Is My Woman",
    "composer": "Gershwin George"
  },
  {
    "title": "Bessie's Blues",
    "composer": "Coltrane John"
  },
  {
    "title": "Best Is Yet To Come (Page 1), The",
    "composer": "Coleman Cy"
  },
  {
    "title": "Best Is Yet To Come (Page 2), The",
    "composer": "Coleman Cy"
  },
  {
    "title": "Best Thing For You Is Me, The",
    "composer": "Berlin Irving"
  },
  {
    "title": "Best Things In Life Are Free, The",
    "composer": "DeSylva-Brown-Henderson"
  },
  {
    "title": "Better Days Ahead",
    "composer": "Metheny Pat"
  },
  {
    "title": "Better Git It In Your Soul",
    "composer": "Mingus Charles"
  },
  {
    "title": "Better Than Anything",
    "composer": "Loughborough-Wheat"
  },
  {
    "title": "Between The Devil And The Deep Blue Sea",
    "composer": "Arlen Harold"
  },
  {
    "title": "Bewitched",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Beyond The Blue Horizon",
    "composer": "Whiting-Harding"
  },
  {
    "title": "Beyond The Sea",
    "composer": "Trenet Charles"
  },
  {
    "title": "Bidin' My Time",
    "composer": "Gershwin George"
  },
  {
    "title": "Big Nick",
    "composer": "Coltrane John"
  },
  {
    "title": "Big Push, The",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Bill Bailey, Won't You Please Come Home",
    "composer": "Cannon Hughie"
  },
  {
    "title": "Bill's Hit Tune",
    "composer": "Evans Bill"
  },
  {
    "title": "Billie's Bounce",
    "composer": "Parker Charlie"
  },
  {
    "title": "Billy Boy",
    "composer": "Traditional"
  },
  {
    "title": "Birk's Works",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "Birth Of The Blues, The",
    "composer": "Henderson Ray"
  },
  {
    "title": "Black And Blue",
    "composer": "Waller Fats"
  },
  {
    "title": "Black And Tan Fantasy",
    "composer": "Ellington-Miley"
  },
  {
    "title": "Black Butterfly",
    "composer": "Ellington-Carruthers-Mills"
  },
  {
    "title": "Black Coffee",
    "composer": "Burke-Webster"
  },
  {
    "title": "Black Narcissus",
    "composer": "Henderson Joe"
  },
  {
    "title": "Black Nile",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Blackberry Winter",
    "composer": "Wilder Alec"
  },
  {
    "title": "Blame It On My Youth",
    "composer": "Levant Oscar"
  },
  {
    "title": "Blood Count",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Bloomdido",
    "composer": "Parker Charlie"
  },
  {
    "title": "Blue (And Broken Hearted)",
    "composer": "Leslie-Handman-Clarke"
  },
  {
    "title": "Blue And Sentimental",
    "composer": "Livingstone-David-Basie"
  },
  {
    "title": "Blue Bossa",
    "composer": "Dorham Kenny"
  },
  {
    "title": "Blue Champagne",
    "composer": "Watts-Ryerson-Eaton"
  },
  {
    "title": "Blue Daniel",
    "composer": "Rosolino Frank"
  },
  {
    "title": "Blue In Green",
    "composer": "Miles Davis, Bill Evans"
  },
  {
    "title": "Blue Lou",
    "composer": "Mills Irving"
  },
  {
    "title": "Blue Monk",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Blue Moon",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Blue Room, The",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Blue Silver",
    "composer": "Silver Horace"
  },
  {
    "title": "Blue Skies",
    "composer": "Berlin Irving"
  },
  {
    "title": "Blue Sphere",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Blue Turning Grey Over You",
    "composer": "Waller Fats"
  },
  {
    "title": "Blueberry Hill",
    "composer": "Lewis-Stock-Rose"
  },
  {
    "title": "Bluehawk",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Blues Connotation",
    "composer": "Coleman Ornette"
  },
  {
    "title": "Blues Five Spot",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Blues For Alice",
    "composer": "Parker Charlie"
  },
  {
    "title": "Blues For Wood",
    "composer": "Shaw Woody"
  },
  {
    "title": "Blues In The Closet",
    "composer": "Pettiford Oscar"
  },
  {
    "title": "Blues In The Night",
    "composer": "Arlen Harold"
  },
  {
    "title": "Blues March",
    "composer": "Golson Benny"
  },
  {
    "title": "Bluesette",
    "composer": "Thielemans Toots"
  },
  {
    "title": "Body And Soul",
    "composer": "Green Johnny"
  },
  {
    "title": "Bohemia After Dark",
    "composer": "Pettiford Oscar"
  },
  {
    "title": "Bolivia",
    "composer": "Walton Cedar"
  },
  {
    "title": "Boo Boo's Birthday",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Booker's Waltz",
    "composer": "Little Booker"
  },
  {
    "title": "Boplicity",
    "composer": "Henry Cleo"
  },
  {
    "title": "Born To Be Blue",
    "composer": "Wells-Torme"
  },
  {
    "title": "Bossa Antigua",
    "composer": "Desmond Paul"
  },
  {
    "title": "Boulevard Of Broken Dreams, The",
    "composer": "Dubin-Warren"
  },
  {
    "title": "Bouncin' With Bud",
    "composer": "Powell Bud"
  },
  {
    "title": "Bourbon Street Parade",
    "composer": "Barbarin Paul"
  },
  {
    "title": "Boy Next Door, The",
    "composer": "Martin-Blane"
  },
  {
    "title": "Boy, What A Night",
    "composer": "Morgan Lee"
  },
  {
    "title": "Brake's Sake",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Brazil (Aquarela Do Brasil)",
    "composer": "Barroso Ary"
  },
  {
    "title": "Brazilian Like",
    "composer": "Petrucciani Michel"
  },
  {
    "title": "Brazilian Suite",
    "composer": "Petrucciani Michel"
  },
  {
    "title": "Breeze And I, The",
    "composer": "Lecuona Ernesto"
  },
  {
    "title": "Bright Boy",
    "composer": "Bright John"
  },
  {
    "title": "Bright Mississippi",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Bright Size Life",
    "composer": "Metheny Pat"
  },
  {
    "title": "Brilliant Corners",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Broadway",
    "composer": "William-Henri-Woode"
  },
  {
    "title": "Brother Can You Spare A Dime",
    "composer": "Yarburg-Gorney"
  },
  {
    "title": "Brotherhood Of Man",
    "composer": "Loesser Frank"
  },
  {
    "title": "Bud Powell",
    "composer": "Corea Chick"
  },
  {
    "title": "Budo",
    "composer": "Davis-Powell"
  },
  {
    "title": "Bunko",
    "composer": "Niehaus Lennie"
  },
  {
    "title": "But Beautiful",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "But Not For Me",
    "composer": "Gershwin George"
  },
  {
    "title": "Butch And Butch",
    "composer": "Nelson Oliver"
  },
  {
    "title": "Butterfly",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Butterfly Dreams",
    "composer": "Clarke Stanley"
  },
  {
    "title": "By Myself",
    "composer": "Schwartz Arthur"
  },
  {
    "title": "Bye Bye Baby",
    "composer": "Styne Jule"
  },
  {
    "title": "Bye Bye Blackbird",
    "composer": "Henderson Ray"
  },
  {
    "title": "Bye Bye Blues",
    "composer": "Hamm-Bennett-Lown-Gray"
  },
  {
    "title": "Bye-Ya",
    "composer": "Monk Thelonious"
  },
  {
    "title": "C-Jam Blues",
    "composer": "Ellington Duke"
  },
  {
    "title": "C.T.A.",
    "composer": "Heath Jimmy"
  },
  {
    "title": "C'est Si Bon",
    "composer": "Betti Henri"
  },
  {
    "title": "Cabaret",
    "composer": "Kander-Ebb"
  },
  {
    "title": "Cabin in the Sky",
    "composer": "Duke Vernon"
  },
  {
    "title": "Call Me",
    "composer": "Hatch Tony"
  },
  {
    "title": "Call Me Irresponsible",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Can't Help Lovin' Dat Man",
    "composer": "Kern Jerome"
  },
  {
    "title": "Can't We Be Friends",
    "composer": "Swift-James"
  },
  {
    "title": "Candy",
    "composer": "David-Whitney-Kramer"
  },
  {
    "title": "Cantaloupe Island",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Captain Marvel",
    "composer": "Corea Chick"
  },
  {
    "title": "Caravan",
    "composer": "Ellington Duke"
  },
  {
    "title": "Caribbean Fire Dance",
    "composer": "Henderson Joe"
  },
  {
    "title": "Catch Me",
    "composer": "Pass Joe"
  },
  {
    "title": "Celia",
    "composer": "Powell Bud"
  },
  {
    "title": "Central Park West",
    "composer": "Coltrane John"
  },
  {
    "title": "Ceora",
    "composer": "Morgan Lee"
  },
  {
    "title": "Chameleon",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Chan's Song (Never Said)",
    "composer": "Herbie Hancock - Stevie Wonder"
  },
  {
    "title": "Change Of Heart",
    "composer": "Metheny Pat"
  },
  {
    "title": "Change Partners",
    "composer": "Berlin Irving"
  },
  {
    "title": "Chant",
    "composer": "Pearson Duke"
  },
  {
    "title": "Charleston",
    "composer": "Johnson James"
  },
  {
    "title": "Chase, The",
    "composer": "Gordon Dexter"
  },
  {
    "title": "Chasin' The Trane",
    "composer": "Coltrane John"
  },
  {
    "title": "Cheek To Cheek",
    "composer": "Berlin Irving"
  },
  {
    "title": "Cheers",
    "composer": "McGhee Howard"
  },
  {
    "title": "Cheese Cake",
    "composer": "Gordon Dexter"
  },
  {
    "title": "Cheetah",
    "composer": "Burrell Kenny"
  },
  {
    "title": "Chega De Saudade (No More Blues)",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Chelsea Bridge",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Cherokee",
    "composer": "Noble Ray"
  },
  {
    "title": "Cheryl",
    "composer": "Parker Charlie"
  },
  {
    "title": "Chicago",
    "composer": "Fisher Fred"
  },
  {
    "title": "Chicken, The",
    "composer": "Ellis Pee-Wee"
  },
  {
    "title": "Children Of The Night",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Chucho",
    "composer": "D'Rivera Paquito"
  },
  {
    "title": "Close Enough For Love",
    "composer": "Mandel-Williams"
  },
  {
    "title": "Close Your Eyes",
    "composer": "Petkere Bernice"
  },
  {
    "title": "Cold Duck Time",
    "composer": "Harris Eddie"
  },
  {
    "title": "Come Back To Me",
    "composer": "Alan Lerner, Burton Lane"
  },
  {
    "title": "Come Fly With Me",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Come Rain Or Come Shine",
    "composer": "Arlen Harold"
  },
  {
    "title": "Come Sunday",
    "composer": "Ellington Duke"
  },
  {
    "title": "Comes Love",
    "composer": "Brown-Stept-Tobias"
  },
  {
    "title": "Comrade Conrad",
    "composer": "Evans Bill"
  },
  {
    "title": "Con Alma",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "Conception",
    "composer": "Shearing George"
  },
  {
    "title": "Conference Of The Birds",
    "composer": "Holland Dave"
  },
  {
    "title": "Confirmation",
    "composer": "Parker Charlie"
  },
  {
    "title": "Contemplation",
    "composer": "Tyner McCoy"
  },
  {
    "title": "Continuum",
    "composer": "Pastorius Jaco"
  },
  {
    "title": "Cool One, The",
    "composer": "Golson Benny"
  },
  {
    "title": "Copenhagen",
    "composer": "Davis-Melrose"
  },
  {
    "title": "Coral",
    "composer": "Jarrett Keith"
  },
  {
    "title": "Corcovado",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Core, The",
    "composer": "Hubbard Freddie"
  },
  {
    "title": "Cottage For Sale",
    "composer": "Robison Willard"
  },
  {
    "title": "Cotton Tail",
    "composer": "Ellington Duke"
  },
  {
    "title": "Could It Be You",
    "composer": "Porter Cole"
  },
  {
    "title": "Countdown",
    "composer": "Coltrane John"
  },
  {
    "title": "Country",
    "composer": "Jarrett Keith"
  },
  {
    "title": "Cousin Mary",
    "composer": "Coltrane John"
  },
  {
    "title": "Crazy He Calls Me",
    "composer": "Sigman Carl"
  },
  {
    "title": "Crazy Rhythm",
    "composer": "Wolfe-Kahn-Meyer"
  },
  {
    "title": "Creole Love Call",
    "composer": "Ellington Duke"
  },
  {
    "title": "Crepuscule With Nellie",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Crisis",
    "composer": "Hubbard Freddie"
  },
  {
    "title": "Criss Cross",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Crosscurrent",
    "composer": "Tristano Lennie"
  },
  {
    "title": "Cry Me A River",
    "composer": "Hamilton Arthur"
  },
  {
    "title": "Crystal Silence",
    "composer": "Corea Chick"
  },
  {
    "title": "Cute",
    "composer": "Hefti Neal"
  },
  {
    "title": "Cyclic Episode",
    "composer": "Rivers Sam"
  },
  {
    "title": "Cynthia's In Love",
    "composer": "Owens-White-Gish"
  },
  {
    "title": "Daahoud",
    "composer": "Brown Clifford"
  },
  {
    "title": "Dance Cadaverous",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Dance Of The Infidels",
    "composer": "Powell Bud"
  },
  {
    "title": "Dancing In The Dark",
    "composer": "Schwartz Arthur"
  },
  {
    "title": "Dancing On The Ceiling",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Danny Boy",
    "composer": "Traditional"
  },
  {
    "title": "Darn That Dream",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Dat Dere",
    "composer": "Timmons Bobby"
  },
  {
    "title": "Day By Day",
    "composer": "Cahn-Stordahl-Weston"
  },
  {
    "title": "Day Dream",
    "composer": "Strayhorn-Ellington"
  },
  {
    "title": "Day Dreaming",
    "composer": "Kern Jerome"
  },
  {
    "title": "Day In, Day Out",
    "composer": "Bloom Rube"
  },
  {
    "title": "Day Waves",
    "composer": "Corea Chick"
  },
  {
    "title": "Daybreak",
    "composer": "Adamson-Grofe"
  },
  {
    "title": "Days And Nights Waiting",
    "composer": "Jarrett Keith"
  },
  {
    "title": "Days Of Wine And Roses",
    "composer": "Mancini Henry"
  },
  {
    "title": "Dear John",
    "composer": "Hubbard Freddie"
  },
  {
    "title": "Dear Lord",
    "composer": "Coltrane John"
  },
  {
    "title": "Dear Old Stockholm",
    "composer": "Traditional"
  },
  {
    "title": "Dearly Beloved",
    "composer": "Kern Jerome"
  },
  {
    "title": "Decision",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Dedicated To You",
    "composer": "Cahn-Chaplin-Zaret"
  },
  {
    "title": "Deed I Do",
    "composer": "Hirsch-Rose"
  },
  {
    "title": "Deep Purple",
    "composer": "De-Rose Peter"
  },
  {
    "title": "Del Sasser",
    "composer": "Jones Sam"
  },
  {
    "title": "Deluge",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Desafinado",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Desafinado (Original)",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Desert Air",
    "composer": "Corea Chick"
  },
  {
    "title": "Detour Ahead",
    "composer": "Frigo - Carter - Ellis"
  },
  {
    "title": "Devil May Care",
    "composer": "Dorough-Kirk"
  },
  {
    "title": "Dewey Square",
    "composer": "Parker Charlie"
  },
  {
    "title": "Dexterity",
    "composer": "Parker Charlie"
  },
  {
    "title": "Diane",
    "composer": "Rapee-pollack"
  },
  {
    "title": "Dienda",
    "composer": "Kirkland Kenny"
  },
  {
    "title": "Dig",
    "composer": "Davis Miles"
  },
  {
    "title": "Dinah",
    "composer": "Akst Harry"
  },
  {
    "title": "Dindi",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Diverse",
    "composer": "Parker Charlie"
  },
  {
    "title": "Django",
    "composer": "Lewis John"
  },
  {
    "title": "Do It Again",
    "composer": "Sylva Gershwin-De"
  },
  {
    "title": "Do Nothin' Til You Hear From Me",
    "composer": "Ellington Duke"
  },
  {
    "title": "Do You Know What It Means?",
    "composer": "Alter Louis"
  },
  {
    "title": "Dolores",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Dolphin Dance",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Dolphin, The",
    "composer": "Eca Luiz"
  },
  {
    "title": "Domingo",
    "composer": "Golson Benny"
  },
  {
    "title": "Don't Be That Way",
    "composer": "Sampson Edgar"
  },
  {
    "title": "Don't Blame Me",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "Don't Explain",
    "composer": "Holiday Billie"
  },
  {
    "title": "Don't Fence Me In",
    "composer": "Porter Cole"
  },
  {
    "title": "Don't Get Around Much Anymore",
    "composer": "Ellington Duke"
  },
  {
    "title": "Don't Go To Strangers",
    "composer": "Kent-Mason-Evans"
  },
  {
    "title": "Don't Know Why",
    "composer": "Harris Jesse"
  },
  {
    "title": "Don't Misunderstand",
    "composer": "Parks Gordon"
  },
  {
    "title": "Don't Take Your Love From Me",
    "composer": "Nemo Henry"
  },
  {
    "title": "Don't Worry 'Bout Me",
    "composer": "Bloom Rube"
  },
  {
    "title": "Donna Lee",
    "composer": "Parker Charlie"
  },
  {
    "title": "Down By The Riverside",
    "composer": "Traditional"
  },
  {
    "title": "Down For Double",
    "composer": "Green Freddie"
  },
  {
    "title": "Down In The Depths",
    "composer": "Porter Cole"
  },
  {
    "title": "Doxy",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Dream",
    "composer": "Mercer Johnny"
  },
  {
    "title": "Dream A Little Dream Of Me",
    "composer": "Schwendt-Andre-Kahn"
  },
  {
    "title": "Dream Dancing",
    "composer": "Porter Cole"
  },
  {
    "title": "Dreamsville",
    "composer": "Mancini Henry"
  },
  {
    "title": "Driftin'",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Duke Ellington's Sound Of Love",
    "composer": "Mingus Charles"
  },
  {
    "title": "Duke, The",
    "composer": "Brubeck Dave"
  },
  {
    "title": "E.S.P.",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Early Autumn",
    "composer": "Burns-Herman"
  },
  {
    "title": "East Of The Sun",
    "composer": "Bowman Brooks"
  },
  {
    "title": "East St. Louis Toodle-oo",
    "composer": "Ellington-Milley"
  },
  {
    "title": "Easter Parade",
    "composer": "Berlin Irving"
  },
  {
    "title": "Easy Does It",
    "composer": "Oliver-Young"
  },
  {
    "title": "Easy Living",
    "composer": "Rainger Ralph"
  },
  {
    "title": "Easy Street",
    "composer": "Jones Alan"
  },
  {
    "title": "Easy To Love",
    "composer": "Porter Cole"
  },
  {
    "title": "Ecaroh",
    "composer": "Silver Horace"
  },
  {
    "title": "Eclypso",
    "composer": "Flanagan Tommy"
  },
  {
    "title": "Edda",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Eiderdown",
    "composer": "Swallow Steve"
  },
  {
    "title": "Eighty One",
    "composer": "Carter Ron"
  },
  {
    "title": "Eisenhower",
    "composer": "Scofield John"
  },
  {
    "title": "El Cajon",
    "composer": "Mandel Johnny"
  },
  {
    "title": "El Gaucho",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Elora",
    "composer": "Johnson J.J."
  },
  {
    "title": "Embraceable You",
    "composer": "Gershwin George"
  },
  {
    "title": "Emily",
    "composer": "Mandel Johnny"
  },
  {
    "title": "End Of A Love Affair, The",
    "composer": "Redding Edward"
  },
  {
    "title": "Epilogue",
    "composer": "Evans Bill"
  },
  {
    "title": "Epistrophy",
    "composer": "Thelonious Monk, Kenny Clarke"
  },
  {
    "title": "Equinox",
    "composer": "Coltrane John"
  },
  {
    "title": "Eronel",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Estate",
    "composer": "Martino Bruno"
  },
  {
    "title": "Eternal Triangle",
    "composer": "Stitt Sonny"
  },
  {
    "title": "Every Time We Say Goodbye",
    "composer": "Porter Cole"
  },
  {
    "title": "Everybody's Song But My Own",
    "composer": "Wheeler Kenny"
  },
  {
    "title": "Everything Happens To Me",
    "composer": "Dennis Matt"
  },
  {
    "title": "Everything I Have Is Yours",
    "composer": "Lane Burton"
  },
  {
    "title": "Everything I Love",
    "composer": "Porter Cole"
  },
  {
    "title": "Everything I've Got Belongs To You",
    "composer": "Rodgers-Hart"
  },
  {
    "title": "Evidence",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Exactly Like You",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "Eye of the Hurricane",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Fall",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Falling Grace",
    "composer": "Swallow Steve"
  },
  {
    "title": "Falling In Love Again",
    "composer": "Hollander Frederick"
  },
  {
    "title": "Falling In Love With Love",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Fantasy in D (or Ugetsu)",
    "composer": "Walton Cedar"
  },
  {
    "title": "Farmer's Trust",
    "composer": "Metheny Pat"
  },
  {
    "title": "Fascinating Rhythm",
    "composer": "Gershwin George"
  },
  {
    "title": "Fascination",
    "composer": "Marchetti Fernando-Dante"
  },
  {
    "title": "Favela",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Fee-Fi-Fo-Fum",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Feel Like Makin' Love",
    "composer": "McDaniels Eugene"
  },
  {
    "title": "Feels So Good",
    "composer": "Mangione Chuck"
  },
  {
    "title": "Fever",
    "composer": "Davenport-Cooley"
  },
  {
    "title": "Fine And Dandy",
    "composer": "Swift Kay"
  },
  {
    "title": "Fine And Mellow",
    "composer": "Holiday Billie"
  },
  {
    "title": "Firm Roots",
    "composer": "Walton Cedar"
  },
  {
    "title": "First Song",
    "composer": "Haden Charlie"
  },
  {
    "title": "Five Brothers",
    "composer": "Mulligan Gerry"
  },
  {
    "title": "Flamenco Sketches",
    "composer": "Davis-Evans"
  },
  {
    "title": "Flamingo",
    "composer": "Grouya Ted"
  },
  {
    "title": "Flat Foot Floogee",
    "composer": "Gaillard-Stuart-Green"
  },
  {
    "title": "Flintstones",
    "composer": "Curtain Hoyt"
  },
  {
    "title": "Fly Me To The Moon",
    "composer": "Howard Bart"
  },
  {
    "title": "Flying Home",
    "composer": "Goodman-Hampton"
  },
  {
    "title": "Folks Who Live On The Hill, The",
    "composer": "Kern Jerome"
  },
  {
    "title": "Fools Rush In",
    "composer": "Bloom Rube"
  },
  {
    "title": "Footprints",
    "composer": "Shorter Wayne"
  },
  {
    "title": "For All We Know",
    "composer": "Coots Fred"
  },
  {
    "title": "For Heaven's Sake",
    "composer": "Edwards-Meyer-Bretton"
  },
  {
    "title": "For Jan",
    "composer": "Wheeler Kenny"
  },
  {
    "title": "For Minors Only",
    "composer": "Heath Jimmy"
  },
  {
    "title": "For Once In My Life",
    "composer": "Murden Orlando"
  },
  {
    "title": "For Sentimental Reasons",
    "composer": "Best William"
  },
  {
    "title": "For You, For Me, For Evermore",
    "composer": "Gershwin George"
  },
  {
    "title": "Forest Flower",
    "composer": "Lloyd Charles"
  },
  {
    "title": "Forever Sonny",
    "composer": "Heath Jimmy"
  },
  {
    "title": "Four",
    "composer": "Davis Miles"
  },
  {
    "title": "Four Brothers",
    "composer": "Giuffre Jimmy"
  },
  {
    "title": "Four In One",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Four On Six",
    "composer": "Montgomery Wes"
  },
  {
    "title": "Fran Dance",
    "composer": "Davis Miles"
  },
  {
    "title": "Freckle Face",
    "composer": "Nestico Sammy"
  },
  {
    "title": "Freddie Freeloader",
    "composer": "Davis Miles"
  },
  {
    "title": "Freight Train",
    "composer": "Flanagan Tommy"
  },
  {
    "title": "Frenesi",
    "composer": "Dominguez Alberto"
  },
  {
    "title": "Friday The 13th",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Frim Fram Sauce, The",
    "composer": "Richardel Joe"
  },
  {
    "title": "From This Moment On",
    "composer": "Porter Cole"
  },
  {
    "title": "Fuchsia Swing Song",
    "composer": "Rivers Sam"
  },
  {
    "title": "Full House",
    "composer": "Montgomery Wes"
  },
  {
    "title": "Funk In Deep Freeze",
    "composer": "Mobley Hank"
  },
  {
    "title": "Funkallero",
    "composer": "Evans Bill"
  },
  {
    "title": "Gallop's Gallop",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Gary's Notebook",
    "composer": "Morgan Lee"
  },
  {
    "title": "Gee Baby, Ain't I Good To You",
    "composer": "Redman Don"
  },
  {
    "title": "Gentle Rain, The",
    "composer": "Bonfa Luiz"
  },
  {
    "title": "Gentle Wind And Falling Tear",
    "composer": "Burton Gary"
  },
  {
    "title": "Georgia On My Mind",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Get Happy",
    "composer": "Arlen Harold"
  },
  {
    "title": "Get Me To The Church On Time",
    "composer": "Lerner Alan"
  },
  {
    "title": "Get Out Of Town",
    "composer": "Porter Cole"
  },
  {
    "title": "Giant Steps",
    "composer": "Coltrane John"
  },
  {
    "title": "Girl From Ipanema, The",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Girl Talk",
    "composer": "Hefti Neal"
  },
  {
    "title": "Give Me The Simple Life",
    "composer": "Bloom Rube"
  },
  {
    "title": "Glad To Be Unhappy",
    "composer": "Rodgers-Hart"
  },
  {
    "title": "Gloria's Step",
    "composer": "LaFaro Scott"
  },
  {
    "title": "Glory Of Love, The",
    "composer": "Hill Billy"
  },
  {
    "title": "God Bless The Child",
    "composer": "Herzog-Holiday"
  },
  {
    "title": "Godchild",
    "composer": "Wallington George"
  },
  {
    "title": "Golden Earring",
    "composer": "Livingston Jay"
  },
  {
    "title": "Gone With The Wind",
    "composer": "Wrubel Allie"
  },
  {
    "title": "Good Bait",
    "composer": "Dameron Tadd"
  },
  {
    "title": "Good Life, The",
    "composer": "Distel Sacha"
  },
  {
    "title": "Good Morning Heartache",
    "composer": "Drake-Fisher-Higginbotham"
  },
  {
    "title": "Goodbye",
    "composer": "Jenkins Gordon"
  },
  {
    "title": "Goodbye Pork Pie Hat",
    "composer": "Mingus Charles"
  },
  {
    "title": "Got A Match?",
    "composer": "Corea Chick"
  },
  {
    "title": "Grand Central",
    "composer": "Coltrane John"
  },
  {
    "title": "Gravy Waltz, The",
    "composer": "Brown Ray"
  },
  {
    "title": "Green Chimneys",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Gregory Is Here",
    "composer": "Silver Horace"
  },
  {
    "title": "Groovin' High",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "H & H",
    "composer": "Metheny Pat"
  },
  {
    "title": "Hackensack",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Half Nelson",
    "composer": "Davis Miles"
  },
  {
    "title": "Hallelujah I Love Her So",
    "composer": "Charles Ray"
  },
  {
    "title": "Hallucinations",
    "composer": "Powell Bud"
  },
  {
    "title": "Happiness Is A Thing Called Joe",
    "composer": "Arlen Harold"
  },
  {
    "title": "Happy Little Sunbeam",
    "composer": "Freeman Russ"
  },
  {
    "title": "Happy Talk",
    "composer": "II Rodgers-Hammerstein"
  },
  {
    "title": "Harlem Nocturne",
    "composer": "Hagen-Rogers"
  },
  {
    "title": "Harlequin",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Haunted Heart",
    "composer": "Schwartz Arthur"
  },
  {
    "title": "Have You Met Miss Jones?",
    "composer": "Rodgers Richard"
  },
  {
    "title": "He's A Tramp",
    "composer": "Lee-Burke"
  },
  {
    "title": "Heart And Soul",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Heat Wave",
    "composer": "Berlin Irving"
  },
  {
    "title": "Heaven",
    "composer": "Ellington Duke"
  },
  {
    "title": "Hello",
    "composer": "Jackson Milt"
  },
  {
    "title": "Hello Dolly",
    "composer": "Herman Jerry"
  },
  {
    "title": "Hello Young Lovers",
    "composer": "Rogers Richard"
  },
  {
    "title": "Here's That Rainy Day",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Here's That Sunny Day",
    "composer": "Kessel Barney"
  },
  {
    "title": "Here's To Life",
    "composer": "Butler Artie"
  },
  {
    "title": "Here's To My Lady",
    "composer": "Bloom-Mercer"
  },
  {
    "title": "Herzog",
    "composer": "Hutcherson Bobby"
  },
  {
    "title": "Hey There",
    "composer": "Alder-Ross"
  },
  {
    "title": "Heyoke",
    "composer": "Wheeler Kenny"
  },
  {
    "title": "Hideaway",
    "composer": "Sanborn David"
  },
  {
    "title": "High Fly",
    "composer": "Weston Randy"
  },
  {
    "title": "High Hopes",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Hindsight",
    "composer": "Walton Cedar"
  },
  {
    "title": "Hocus-Pocus",
    "composer": "Morgan Lee"
  },
  {
    "title": "Holy Land",
    "composer": "Walton Cedar"
  },
  {
    "title": "Home At Last",
    "composer": "Mobley Hank"
  },
  {
    "title": "Home Cookin'",
    "composer": "Silver Horace"
  },
  {
    "title": "Homecoming",
    "composer": "Holland Dave"
  },
  {
    "title": "Honeysuckle Rose",
    "composer": "Waller Fats"
  },
  {
    "title": "Horace-Scope",
    "composer": "Silver Horace"
  },
  {
    "title": "Hot House",
    "composer": "Dameron Tadd"
  },
  {
    "title": "House Of Jade",
    "composer": "Shorter Wayne"
  },
  {
    "title": "How About You",
    "composer": "Lane Burton"
  },
  {
    "title": "How Are Things In Glocca Morra",
    "composer": "Lane Burton"
  },
  {
    "title": "How Deep Is The Ocean",
    "composer": "Berlin Irving"
  },
  {
    "title": "How High The Moon",
    "composer": "Lewis Morgan"
  },
  {
    "title": "How Insensitive",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "How Little We Know",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "How Long Has This Been Going On?",
    "composer": "Gershwin George"
  },
  {
    "title": "How My Heart Sings",
    "composer": "Zindars Earl"
  },
  {
    "title": "Humpty Dumpty",
    "composer": "Corea Chick"
  },
  {
    "title": "Hungaria",
    "composer": "Reinhardt Django"
  },
  {
    "title": "I Ain't Got Nobody",
    "composer": "Graham-Williams"
  },
  {
    "title": "I Believe In You",
    "composer": "Loesser Frank"
  },
  {
    "title": "I Can't Believe That You're In Love With Me",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "I Can't Get Started",
    "composer": "Duke Vernon"
  },
  {
    "title": "I Can't Give You Anything But Love",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "I Concentrate On You",
    "composer": "Porter Cole"
  },
  {
    "title": "I Could Have Danced All Night",
    "composer": "Loewe Frederick"
  },
  {
    "title": "I Could Write A Book",
    "composer": "Rodgers Richard"
  },
  {
    "title": "I Cover The Waterfront",
    "composer": "Green Johnny"
  },
  {
    "title": "I Cried For You",
    "composer": "Freed-Arnheim-Lyman"
  },
  {
    "title": "I Didn't Know About You",
    "composer": "Ellington Duke"
  },
  {
    "title": "I Didn't Know What Time It Was",
    "composer": "Rodgers Richard"
  },
  {
    "title": "I Don't Know Enough About You",
    "composer": "Lee Peggy"
  },
  {
    "title": "I Don't Want To Miss Mississippi",
    "composer": "Ellis Serger"
  },
  {
    "title": "I Fall In Love Too Easily",
    "composer": "Styne Jule"
  },
  {
    "title": "I Feel Pretty",
    "composer": "Bernstein-Sondheim"
  },
  {
    "title": "I Found A New Baby",
    "composer": "Palmer-Williams"
  },
  {
    "title": "I Get A Kick Out Of You",
    "composer": "Porter Cole"
  },
  {
    "title": "I Get Along Without You",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "I Got It Bad",
    "composer": "Ellington Duke"
  },
  {
    "title": "I Got Rhythm",
    "composer": "Gershwin George"
  },
  {
    "title": "I Got The Sun In The Morning",
    "composer": "Berlin Irving"
  },
  {
    "title": "I Gotta Right To Sing The Blues",
    "composer": "Arlen Harold"
  },
  {
    "title": "I Guess I'll Hang My Tears Out To Dry",
    "composer": "Styne Jule"
  },
  {
    "title": "I Guess I'll Have To Change My Plan",
    "composer": "Schwartz Arthur"
  },
  {
    "title": "I Hadn't Anyone Till You",
    "composer": "Noble Ray"
  },
  {
    "title": "I Have Dreamed",
    "composer": "Rodgers-Hammerstein"
  },
  {
    "title": "I Hear A Rhapsody",
    "composer": "Fragos-Baker-Gasparre"
  },
  {
    "title": "I Hear Music",
    "composer": "Lane Burton"
  },
  {
    "title": "I Left My Heart In San Francisco",
    "composer": "Cory George"
  },
  {
    "title": "I Let A Song Go Out Of My Heart",
    "composer": "Ellington Duke"
  },
  {
    "title": "I Like The Likes Of You",
    "composer": "Duke Vernon"
  },
  {
    "title": "I Love Being Here With You",
    "composer": "Bill Schluger, Peggy Lee"
  },
  {
    "title": "I Love Paris",
    "composer": "Porter Cole"
  },
  {
    "title": "I Love You",
    "composer": "Porter Cole"
  },
  {
    "title": "I Loves You Porgy",
    "composer": "Gershwin George"
  },
  {
    "title": "I May Be Wrong",
    "composer": "Sullivan Henry"
  },
  {
    "title": "I Mean You",
    "composer": "Monk Thelonious"
  },
  {
    "title": "I Only Have Eyes For You",
    "composer": "Warren Harry"
  },
  {
    "title": "I Remember Clifford",
    "composer": "Golson Benny"
  },
  {
    "title": "I Remember You",
    "composer": "Schertzinger Victor"
  },
  {
    "title": "I See Your Face Before Me",
    "composer": "Schwartz Arthur"
  },
  {
    "title": "I Should Care",
    "composer": "Cahn-Stordahl-Weston"
  },
  {
    "title": "I Surrender Dear",
    "composer": "Barris Harry"
  },
  {
    "title": "I Think Of You",
    "composer": "Elliot-Marcotte"
  },
  {
    "title": "I Thought About You",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "I Used To Be Color Blind",
    "composer": "Berlin Irving"
  },
  {
    "title": "I Want To Be Happy",
    "composer": "Youmans Vincent"
  },
  {
    "title": "I Want To Talk About You",
    "composer": "Eckstine Billy"
  },
  {
    "title": "I Was Doing All Right",
    "composer": "Gershwin George"
  },
  {
    "title": "I Will Wait For You",
    "composer": "Legrand Michel"
  },
  {
    "title": "I Wish I Knew",
    "composer": "Warren Harry"
  },
  {
    "title": "I Wish I Knew How It Would Feel To Be Free",
    "composer": "Taylor Billy"
  },
  {
    "title": "I Wish I Were In Love Again",
    "composer": "Rodgers Richard"
  },
  {
    "title": "I Wish You Love",
    "composer": "Trenet Charles"
  },
  {
    "title": "I Won't Dance",
    "composer": "Kern Jerome"
  },
  {
    "title": "I'll Be Around",
    "composer": "Wilder Alec"
  },
  {
    "title": "I'll Be Seeing You",
    "composer": "Fain Sammy"
  },
  {
    "title": "I'll Close My Eyes",
    "composer": "Reid-Kaye"
  },
  {
    "title": "I'll Get By (As Long As I Have You)",
    "composer": "Ahlert-Turk"
  },
  {
    "title": "I'll Never Be The Same",
    "composer": "Khan-Malneck-Signorelli"
  },
  {
    "title": "I'll Never Smile Again",
    "composer": "Lowe Ruth"
  },
  {
    "title": "I'll Only Miss Her When I Think Of Her",
    "composer": "Cahn-VanHeusen"
  },
  {
    "title": "I'll Remember April",
    "composer": "Raye-DePaul"
  },
  {
    "title": "I'll See You In My Dreams",
    "composer": "Jones-Kahn"
  },
  {
    "title": "I'll Take Romance",
    "composer": "Oakland Ben"
  },
  {
    "title": "I'm A Fool To Want You",
    "composer": "Herron-Sinatra-Wolf"
  },
  {
    "title": "I'm All Smiles",
    "composer": "Leonard-Martin"
  },
  {
    "title": "I'm Always Chasing Rainbows",
    "composer": "Carroll Harry"
  },
  {
    "title": "I'm An Old Cowhand",
    "composer": "Mercer Johnny"
  },
  {
    "title": "I'm Beginning To See The Light",
    "composer": "Hodges-James-Ellington"
  },
  {
    "title": "I'm Confessin' (That I Love You)",
    "composer": "Daugherty-Neiberg-Reynolds"
  },
  {
    "title": "I'm Getting Sentimental Over You",
    "composer": "Bassman George"
  },
  {
    "title": "I'm Glad There Is You",
    "composer": "Dorsey Jimmy"
  },
  {
    "title": "I'm Gonna Laugh You Right Out Of My Life",
    "composer": "Coleman Cy"
  },
  {
    "title": "I'm Gonna Sit Right Down and Write Myself A Letter",
    "composer": "Ahlert Fred"
  },
  {
    "title": "I'm In The Mood For Love",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "I'm Just A Lucky So-And-So",
    "composer": "Ellington Duke"
  },
  {
    "title": "I'm Old Fashioned",
    "composer": "Kern Jerome"
  },
  {
    "title": "I'm Putting All My Eggs In One Basket",
    "composer": "Berlin Irving"
  },
  {
    "title": "I'm Sitting On Top Of The World",
    "composer": "Louis-Henderson-Young"
  },
  {
    "title": "I'm Through With Love",
    "composer": "Kahn-Malneck-Livingston"
  },
  {
    "title": "I've Found A New Baby",
    "composer": "Palmer-Williams"
  },
  {
    "title": "I've Got A Crush On You",
    "composer": "Gershwin George"
  },
  {
    "title": "I've Got My Love To Keep Me Warm",
    "composer": "Berlin Irving"
  },
  {
    "title": "I've Got The World On A String",
    "composer": "Arlen Harold"
  },
  {
    "title": "I've Got You Under My Skin",
    "composer": "Porter Cole"
  },
  {
    "title": "I've Grown Accustomed To Her Face",
    "composer": "Loewe Frederick"
  },
  {
    "title": "I've Heard That Song Before",
    "composer": "Styne Jule"
  },
  {
    "title": "I've Never Been In Love Before",
    "composer": "Loesser Frank"
  },
  {
    "title": "I've Told Eve'ry Little Star",
    "composer": "Kern Jerome"
  },
  {
    "title": "Idle Moments",
    "composer": "Green Grant"
  },
  {
    "title": "If Ever I Would Leave You",
    "composer": "Loewe Frederick"
  },
  {
    "title": "If I Could Be With You",
    "composer": "Johnson James"
  },
  {
    "title": "If I Didn't Care",
    "composer": "Lawrence Jack"
  },
  {
    "title": "If I Had You",
    "composer": "Campbell-Connelly-Shapiro"
  },
  {
    "title": "If I Knew Then (What I Know Now)",
    "composer": "Jurgens-Howard"
  },
  {
    "title": "If I Loved You",
    "composer": "Rodgers Richard"
  },
  {
    "title": "If I Ruled The World",
    "composer": "Bricusse Leslie"
  },
  {
    "title": "If I Should Lose You",
    "composer": "Rainger Ralph"
  },
  {
    "title": "If I Were A Bell",
    "composer": "Loesser Frank"
  },
  {
    "title": "If There Is Someone Lovelier",
    "composer": "Dietz-Schwartz"
  },
  {
    "title": "If You Could See Me Now",
    "composer": "Dameron Tadd"
  },
  {
    "title": "If You Ever Should Leave",
    "composer": "Cahn-Chaplin"
  },
  {
    "title": "If You Never Come To Me (Inutil Paisagem)",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Ill Wind",
    "composer": "Arlen Harold"
  },
  {
    "title": "Imagination",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Impressions",
    "composer": "Coltrane John"
  },
  {
    "title": "In A Little Spanish Town",
    "composer": "Wayne-Lewis-Young"
  },
  {
    "title": "In A Mellow Tone (In A Mellotone)",
    "composer": "Ellington Duke"
  },
  {
    "title": "In a Sentimental Mood",
    "composer": "Ellington Duke"
  },
  {
    "title": "In A Shanty In Old Shanty Town",
    "composer": "Little-Siras"
  },
  {
    "title": "In A Silent Way",
    "composer": "Zawinul Josef"
  },
  {
    "title": "In Her Family",
    "composer": "Metheny Pat"
  },
  {
    "title": "In Love In Vain",
    "composer": "Leo Robin Jerome Kern"
  },
  {
    "title": "In Pursuit Of The 27th Man",
    "composer": "Silver Horace"
  },
  {
    "title": "In The Cool, Cool, Cool Of The Evening",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "In The Middle Of A Kiss",
    "composer": "Coslow Sam"
  },
  {
    "title": "In The Still Of The Night",
    "composer": "Porter Cole"
  },
  {
    "title": "In The Wee Small Hours Of The Morning",
    "composer": "Mann-Hilliard"
  },
  {
    "title": "In Walked Bud",
    "composer": "Monk Thelonious"
  },
  {
    "title": "In Your Own Sweet Way",
    "composer": "Brubeck Dave"
  },
  {
    "title": "Incentive",
    "composer": "Silver Horace"
  },
  {
    "title": "Inch Worm, The",
    "composer": "Loesser Frank"
  },
  {
    "title": "Indian Summer",
    "composer": "Victor-Aldubin-Herbert"
  },
  {
    "title": "Indiana (Back Home Again In)",
    "composer": "Hanley James"
  },
  {
    "title": "Infant Eyes",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Inner Urge",
    "composer": "Henderson Joe"
  },
  {
    "title": "Interplay",
    "composer": "Evans Bill"
  },
  {
    "title": "Intrepid Fox, The",
    "composer": "Hubbard Freddie"
  },
  {
    "title": "Invitation",
    "composer": "Kaper Bronislau"
  },
  {
    "title": "Iris",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Irresistable You",
    "composer": "DePaul Gene"
  },
  {
    "title": "Is That So?",
    "composer": "Pearson Duke"
  },
  {
    "title": "Is You Is Or Is You Ain't (Ma' Baby)",
    "composer": "Austin-Jordan"
  },
  {
    "title": "Isfahan",
    "composer": "Strayhorn-Ellington"
  },
  {
    "title": "Island Birdie",
    "composer": "Tyner McCoy"
  },
  {
    "title": "Isn't It A Pity",
    "composer": "Gershwin George"
  },
  {
    "title": "Isn't It Romantic?",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Isn't This A Lovely Day (To Be Caught In The Rain)",
    "composer": "Berlin Irving"
  },
  {
    "title": "Isotope",
    "composer": "Henderson Joe"
  },
  {
    "title": "Israel",
    "composer": "Carisi John"
  },
  {
    "title": "It Ain't Necessarily So",
    "composer": "Gershwin George"
  },
  {
    "title": "It Could Happen To You",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "It Don't Mean A Thing",
    "composer": "Ellington Duke"
  },
  {
    "title": "It Had To Be You",
    "composer": "Jones Isham"
  },
  {
    "title": "It Might As Well Be Spring",
    "composer": "Rodgers Richard"
  },
  {
    "title": "It Never Entered My Mind",
    "composer": "Rodgers Richard"
  },
  {
    "title": "It Only Happens When I Dance With You",
    "composer": "Berlin Irving"
  },
  {
    "title": "It Was So Good While It Lasted",
    "composer": "Poll-Ackers"
  },
  {
    "title": "It's A Big Wide Wonderful World",
    "composer": "Rox John"
  },
  {
    "title": "It's A Blue World",
    "composer": "Wright-Forrest"
  },
  {
    "title": "It's A Dance",
    "composer": "Petrucciani Michel"
  },
  {
    "title": "It's A Good Day",
    "composer": "Lee Peggy"
  },
  {
    "title": "It's A Lovely Day Today",
    "composer": "Berlin Irving"
  },
  {
    "title": "It's A Raggy Waltz",
    "composer": "Brubeck Dave"
  },
  {
    "title": "It's All Right With Me",
    "composer": "Porter Cole"
  },
  {
    "title": "It's Been A Long Long Time",
    "composer": "Styne Jule"
  },
  {
    "title": "It's De-lovely",
    "composer": "Porter Cole"
  },
  {
    "title": "It's Easy To Remember",
    "composer": "Rodgers Richard"
  },
  {
    "title": "It's Impossible",
    "composer": "Manzanero Armando"
  },
  {
    "title": "It's Just Talk",
    "composer": "Metheny Pat"
  },
  {
    "title": "It's Magic",
    "composer": "Styne Jule"
  },
  {
    "title": "It's Only a Paper Moon",
    "composer": "Arlen Harold"
  },
  {
    "title": "It's The Talk Of The Town",
    "composer": "Livingston Jerry"
  },
  {
    "title": "It's You Or No One",
    "composer": "Styne Jule"
  },
  {
    "title": "Jackie-ing",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Jaco",
    "composer": "Metheny Pat"
  },
  {
    "title": "James",
    "composer": "Metheny Pat"
  },
  {
    "title": "Jazz Folk",
    "composer": "Abercrombie John"
  },
  {
    "title": "Je Ne Sais Pas",
    "composer": "Hampton-Jones"
  },
  {
    "title": "Jeannie's Song",
    "composer": "Ivery Marchel"
  },
  {
    "title": "Jeannine",
    "composer": "Pearson Duke"
  },
  {
    "title": "Jeepers Creepers",
    "composer": "Warren Harry"
  },
  {
    "title": "Jersey Bounce",
    "composer": "Plater-Bradshaw-Johnson"
  },
  {
    "title": "Jinrikisha",
    "composer": "Henderson Joe"
  },
  {
    "title": "Jitterbug Waltz",
    "composer": "Waller Fats"
  },
  {
    "title": "Jody Grind, The",
    "composer": "Silver Horace"
  },
  {
    "title": "Johnny Come Lately",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Joker, The",
    "composer": "Morgan Lee"
  },
  {
    "title": "Jordu",
    "composer": "Jordan Duke"
  },
  {
    "title": "Joshua",
    "composer": "Feldman Victor"
  },
  {
    "title": "Joy Spring",
    "composer": "Brown Clifford"
  },
  {
    "title": "Juju",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Jumpin With Symphony Sid",
    "composer": "Young Lester"
  },
  {
    "title": "Just A Gigolo",
    "composer": "Casucci Leonello"
  },
  {
    "title": "Just A-Sittin' And A-Rockin",
    "composer": "Ellington-Strayhorn-Gaines"
  },
  {
    "title": "Just Friends",
    "composer": "Klenner John"
  },
  {
    "title": "Just In Time",
    "composer": "Styne Jule"
  },
  {
    "title": "Just In Tune",
    "composer": "Abercrombie John"
  },
  {
    "title": "Just One More Chance",
    "composer": "Johnston-Coslow"
  },
  {
    "title": "Just One Of Those Things",
    "composer": "Porter Cole"
  },
  {
    "title": "Just Squeeze Me",
    "composer": "Ellington Duke"
  },
  {
    "title": "Just You, Just Me",
    "composer": "Greer Jesse"
  },
  {
    "title": "Kary's Trance",
    "composer": "Konitz Lee"
  },
  {
    "title": "Katrina Ballerina",
    "composer": "Shaw Woody"
  },
  {
    "title": "Keepin' Myself For You",
    "composer": "Youmans Vincent"
  },
  {
    "title": "Kicker, The",
    "composer": "Henderson Joe"
  },
  {
    "title": "Kids Are Pretty People",
    "composer": "Jones Thad"
  },
  {
    "title": "Killer Joe",
    "composer": "Golson Benny"
  },
  {
    "title": "Klactoveedsedstene",
    "composer": "Parker Charlie"
  },
  {
    "title": "Ko Ko",
    "composer": "Parker Charlie"
  },
  {
    "title": "L.O.V.E.",
    "composer": "Gabler-Kaempfert"
  },
  {
    "title": "La Fiesta",
    "composer": "Corea Chick"
  },
  {
    "title": "La Vie En Rose",
    "composer": "Guglielmi-Piaf-David"
  },
  {
    "title": "Ladies In Mercedes",
    "composer": "Swallow Steve"
  },
  {
    "title": "Lady Bird",
    "composer": "Dameron Tadd"
  },
  {
    "title": "Lady is a Tramp, The",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Lady Sings The Blues",
    "composer": "Nichols-Holiday"
  },
  {
    "title": "Lady's In Love With You, The",
    "composer": "Lane Burton"
  },
  {
    "title": "Lakes",
    "composer": "Metheny Pat"
  },
  {
    "title": "Lament",
    "composer": "Johnson J.J."
  },
  {
    "title": "Lamp Is Low, The",
    "composer": "DeRose-Shefter"
  },
  {
    "title": "Last Night When We Were Young",
    "composer": "Arlen Harold"
  },
  {
    "title": "Last Time I Saw Paris, The",
    "composer": "Mancini Henry"
  },
  {
    "title": "Last Train Home",
    "composer": "Metheny Pat"
  },
  {
    "title": "Laura",
    "composer": "Raksin David"
  },
  {
    "title": "Laurie",
    "composer": "Evans Bill"
  },
  {
    "title": "Lazy Afternoon",
    "composer": "Latouche-Moross"
  },
  {
    "title": "Lazy Bird",
    "composer": "Coltrane John"
  },
  {
    "title": "Lazy River",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Lazybones",
    "composer": "Carmichael-Mercer"
  },
  {
    "title": "Leaving",
    "composer": "Beirach Richie"
  },
  {
    "title": "Leila",
    "composer": "Montgomery Wes"
  },
  {
    "title": "Lennie-Bird",
    "composer": "Tristano Lennie"
  },
  {
    "title": "Lennie's Pennies",
    "composer": "Tristano Lennie"
  },
  {
    "title": "Let There Be Love",
    "composer": "Rand-Grant"
  },
  {
    "title": "Let There Be You",
    "composer": "Young-Cavanaugh"
  },
  {
    "title": "Let's Call The Whole Thing Off",
    "composer": "Gershwin George"
  },
  {
    "title": "Let's Call This",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Let's Cool One",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Let's Do It (Let's Fall In Love)",
    "composer": "Porter Cole"
  },
  {
    "title": "Let's Face The Music And Dance",
    "composer": "Berlin Irving"
  },
  {
    "title": "Let's Fall In Love",
    "composer": "Arlen Harold"
  },
  {
    "title": "Let's Get Away From It All",
    "composer": "Dennis-Adair"
  },
  {
    "title": "Let's Get Lost",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "Li'l Darling",
    "composer": "Hefti Neal"
  },
  {
    "title": "Liberia",
    "composer": "Coltrane John"
  },
  {
    "title": "Light Blue",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Ligia",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Like A Lover",
    "composer": "Dori Caymmi-Nelson Motta"
  },
  {
    "title": "Like Someone In Love",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Like Sonny",
    "composer": "Coltrane John"
  },
  {
    "title": "Lily of The Valley",
    "composer": "Traditional"
  },
  {
    "title": "Limbo",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Limehouse Blues",
    "composer": "Braham-Furber"
  },
  {
    "title": "Line For Lyons",
    "composer": "Mulligan Gerry"
  },
  {
    "title": "Linger Awhile",
    "composer": "Rose Vincent"
  },
  {
    "title": "Litha",
    "composer": "Corea Chick"
  },
  {
    "title": "Little B's Poem",
    "composer": "Hutcherson Bobby"
  },
  {
    "title": "Little Boat (O Barquinho)",
    "composer": "Menescal Roberto"
  },
  {
    "title": "Little Chicago Fire",
    "composer": "Foster Frank"
  },
  {
    "title": "Little Dancer",
    "composer": "Harrell Tom"
  },
  {
    "title": "Little Girl Blue",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Little Niles",
    "composer": "Weston Randy"
  },
  {
    "title": "Little Peace In C For You",
    "composer": "Petrucciani Michel"
  },
  {
    "title": "Little Rootie Tootie",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Little Sunflower",
    "composer": "Hubbard Freddie"
  },
  {
    "title": "Little Waltz",
    "composer": "Carter Ron"
  },
  {
    "title": "Little Willie Leaps",
    "composer": "Parker Charlie"
  },
  {
    "title": "Liza",
    "composer": "Gershwin George"
  },
  {
    "title": "Locomotion",
    "composer": "Coltrane John"
  },
  {
    "title": "Lone Jack (Page 1)",
    "composer": "Metheny Pat"
  },
  {
    "title": "Lone Jack (Page 2 - Solos)",
    "composer": "Metheny Pat"
  },
  {
    "title": "Lonely Dreams",
    "composer": "Gibbs Terry"
  },
  {
    "title": "Lonely Woman",
    "composer": "Silver Horace"
  },
  {
    "title": "Lonesome Road, The",
    "composer": "Austin-Shilkret"
  },
  {
    "title": "Long Ago And Far Away",
    "composer": "Kern Jerome"
  },
  {
    "title": "Lonnie's Lament",
    "composer": "Coltrane John"
  },
  {
    "title": "Look For The Silver Lining",
    "composer": "Kern Jerome"
  },
  {
    "title": "Look Of Love, The",
    "composer": "Bacharach Burt"
  },
  {
    "title": "Look To The Rainbow",
    "composer": "Lane Burton"
  },
  {
    "title": "Look To The Sky",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Looking Up",
    "composer": "Petrucciani Michel"
  },
  {
    "title": "Loop, The",
    "composer": "Corea Chick"
  },
  {
    "title": "Lost",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Lotus Blossom",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Love For Sale",
    "composer": "Porter Cole"
  },
  {
    "title": "Love Is Just Around The Corner",
    "composer": "Gensler Lewis"
  },
  {
    "title": "Love Is The Sweetest Thing",
    "composer": "Noble Ray"
  },
  {
    "title": "Love Letters",
    "composer": "Young Victor"
  },
  {
    "title": "Love Me Or Leave Me",
    "composer": "Donaldson Walter"
  },
  {
    "title": "Love Nest, The",
    "composer": "Hirsch Louis"
  },
  {
    "title": "Love Vibrations",
    "composer": "Silver Horace"
  },
  {
    "title": "Love Walked In",
    "composer": "Gershwin George"
  },
  {
    "title": "Lover",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Lover Man",
    "composer": "Davis-Ramirez-Sherman"
  },
  {
    "title": "Lover, Come Back To Me",
    "composer": "Romberg Sigmund"
  },
  {
    "title": "Lucky Southern",
    "composer": "Jarrett Keith"
  },
  {
    "title": "Lullaby In Rhythm",
    "composer": "Goodman-Hirsch"
  },
  {
    "title": "Lullaby Of Birdland",
    "composer": "Shearing George"
  },
  {
    "title": "Lullaby Of The Leaves",
    "composer": "Petkere Bernice"
  },
  {
    "title": "Lulu's Back In Town",
    "composer": "Warren Harry"
  },
  {
    "title": "Lush Life",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Lyresto",
    "composer": "Burrell Kenny"
  },
  {
    "title": "Ma Belle Hélène",
    "composer": "Wheeler Kenny"
  },
  {
    "title": "Mack The Knife",
    "composer": "Weill-Brecht"
  },
  {
    "title": "Mahjong",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Maiden Voyage",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Make Someone Happy",
    "composer": "Styne Jule"
  },
  {
    "title": "Making Whoopee",
    "composer": "Donaldson Walter"
  },
  {
    "title": "Mambo Inn",
    "composer": "Bauza-Sampson-Woodlen"
  },
  {
    "title": "Man I Love, The",
    "composer": "Gershwin George"
  },
  {
    "title": "Man That Got Away, The",
    "composer": "Arlen Harold"
  },
  {
    "title": "Manha De Carnaval (Black Orpheus)",
    "composer": "Bonfa Luiz"
  },
  {
    "title": "Manhattan",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Manoir De Mes Rêves (Django's Castle)",
    "composer": "Reinhardt Django"
  },
  {
    "title": "Manteca",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "Martha's Prize",
    "composer": "Walton Cedar"
  },
  {
    "title": "Mas Que Nada",
    "composer": "Jorge Ben Jor"
  },
  {
    "title": "Masquerade Is Over, The",
    "composer": "Wrubel Allie"
  },
  {
    "title": "Maybe I Should Change My Ways",
    "composer": "Ellington Duke"
  },
  {
    "title": "Maybe September",
    "composer": "Faith Percy"
  },
  {
    "title": "Maze, The",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Mc Jolt",
    "composer": "Beirach Richie"
  },
  {
    "title": "Mean To Me",
    "composer": "Turk-Ahlert"
  },
  {
    "title": "Meaning Of The Blues, The",
    "composer": "Worth-Troup"
  },
  {
    "title": "Meditation",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Memories Of Tomorrow",
    "composer": "Jarrett Keith"
  },
  {
    "title": "Memories Of You",
    "composer": "Blake Eubie"
  },
  {
    "title": "Mercy Mercy Mercy",
    "composer": "Zawinul Joe"
  },
  {
    "title": "Midnight Blue",
    "composer": "Burrell Kenny"
  },
  {
    "title": "Midnight Mood",
    "composer": "Zawinul Joe"
  },
  {
    "title": "Midnight Sun",
    "composer": "Hampton-Burke-Mercer"
  },
  {
    "title": "Midnight Voyage",
    "composer": "Calderazzo Joey"
  },
  {
    "title": "Milano",
    "composer": "Lewis John"
  },
  {
    "title": "Miles Ahead",
    "composer": "Davis Miles"
  },
  {
    "title": "Milestones (New)",
    "composer": "Davis Miles"
  },
  {
    "title": "Milestones (Old)",
    "composer": "Davis Miles"
  },
  {
    "title": "Mimi",
    "composer": "Rogers Richard"
  },
  {
    "title": "Mimosa",
    "composer": "Benson George"
  },
  {
    "title": "Minoat",
    "composer": "Waldron Mal"
  },
  {
    "title": "Minor Blues",
    "composer": "Rosenwinkel Kurt"
  },
  {
    "title": "Minor Mishap",
    "composer": "Flanagan Tommy"
  },
  {
    "title": "Minor Mood",
    "composer": "Brown Clifford"
  },
  {
    "title": "Minor Strain",
    "composer": "Timmons Bobby"
  },
  {
    "title": "Minority",
    "composer": "Gryce Gigi"
  },
  {
    "title": "Minuano (Six Eight)",
    "composer": "Pat Metheny - Lyle Mays"
  },
  {
    "title": "Mirror, Mirror",
    "composer": "Corea Chick"
  },
  {
    "title": "Misterioso",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Misty",
    "composer": "Garner Erroll"
  },
  {
    "title": "Miyako",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Moanin'",
    "composer": "Timmons Bobby"
  },
  {
    "title": "Moment's Notice",
    "composer": "Coltrane John"
  },
  {
    "title": "Moments To Remember",
    "composer": "Allen Robert"
  },
  {
    "title": "Mona Lisa",
    "composer": "Livingston-Evans"
  },
  {
    "title": "Monk's Dream",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Monk's Mood",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Mood Indigo",
    "composer": "Ellington Duke"
  },
  {
    "title": "Moon Alley",
    "composer": "Harrell Tom"
  },
  {
    "title": "Moon And Sand",
    "composer": "Wilder-Palitz"
  },
  {
    "title": "Moon Mist",
    "composer": "Ellington-Mercer"
  },
  {
    "title": "Moon Rays",
    "composer": "Silver Horace"
  },
  {
    "title": "Moon River",
    "composer": "Mancini Henry"
  },
  {
    "title": "Moonchild",
    "composer": "Jarrett Keith"
  },
  {
    "title": "Moondance",
    "composer": "Morrison Van"
  },
  {
    "title": "Moonglow",
    "composer": "Hudson-Lange-Mills"
  },
  {
    "title": "Moonlight Becomes You",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Moonlight In Vermont",
    "composer": "Suessdorf Karl"
  },
  {
    "title": "Moonlight Saving Time",
    "composer": "Kahal Irving"
  },
  {
    "title": "Moonlight Serenade",
    "composer": "Miller-Parish"
  },
  {
    "title": "Moontrane, The",
    "composer": "Shaw Woody"
  },
  {
    "title": "Moose The Mooche",
    "composer": "Parker Charlie"
  },
  {
    "title": "More I See You, The",
    "composer": "Warren Harry"
  },
  {
    "title": "More Than You Know",
    "composer": "Youmans Vincent"
  },
  {
    "title": "Morgan The Pirate",
    "composer": "Morgan Lee"
  },
  {
    "title": "Morning",
    "composer": "Fischer Clare"
  },
  {
    "title": "Most Beautiful Girl In The World, The",
    "composer": "Rodgers-Hart"
  },
  {
    "title": "Moten Swing",
    "composer": "Moten Bennie"
  },
  {
    "title": "Mountain Greenery",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Move",
    "composer": "Best Denzil"
  },
  {
    "title": "Mr. Day",
    "composer": "Coltrane John"
  },
  {
    "title": "Mr. P.C.",
    "composer": "Coltrane John"
  },
  {
    "title": "My Baby Just Cares For Me",
    "composer": "Donaldson Walter"
  },
  {
    "title": "My Buddy",
    "composer": "Donaldson Walter"
  },
  {
    "title": "My Favorite Things",
    "composer": "Rodgers Richard"
  },
  {
    "title": "My Foolish Heart",
    "composer": "Young Victor"
  },
  {
    "title": "My Funny Valentine",
    "composer": "Rodgers Richard"
  },
  {
    "title": "My Heart Belongs To Daddy",
    "composer": "Porter Cole"
  },
  {
    "title": "My Heart Stood Still",
    "composer": "Rodgers Richard"
  },
  {
    "title": "My Ideal",
    "composer": "Whiting Richard"
  },
  {
    "title": "My Last Affair",
    "composer": "Johnson Haven"
  },
  {
    "title": "My Little Brown Book",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "My Little Suede Shoes",
    "composer": "Parker Charlie"
  },
  {
    "title": "My Lucky Star",
    "composer": "DeSylva-Brown-Henderson"
  },
  {
    "title": "My Man's Gone Now",
    "composer": "Gershwin George"
  },
  {
    "title": "My Melancholy Baby",
    "composer": "Burnett-Norton"
  },
  {
    "title": "My Old Flame",
    "composer": "Johnson-Coslow"
  },
  {
    "title": "My One And Only Love",
    "composer": "Wood-Mellin"
  },
  {
    "title": "My Romance",
    "composer": "Rodgers Richard"
  },
  {
    "title": "My Secret Love",
    "composer": "Vogel Roger"
  },
  {
    "title": "My Shining Hour",
    "composer": "Arlen Harold"
  },
  {
    "title": "My Ship",
    "composer": "Weill Kurt"
  },
  {
    "title": "My Song",
    "composer": "Jarrett Keith"
  },
  {
    "title": "My Way",
    "composer": "Revaux-Francois-Thibaud-Anka"
  },
  {
    "title": "Nacada",
    "composer": "Metheny Pat"
  },
  {
    "title": "Naima",
    "composer": "Coltrane John"
  },
  {
    "title": "Nancy (With The Laughing Face)",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Nardis",
    "composer": "Davis Miles"
  },
  {
    "title": "Nascimento",
    "composer": "Harris Barry"
  },
  {
    "title": "Nature Boy",
    "composer": "Ahbez Eden"
  },
  {
    "title": "Nearness Of You, The",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Nefertiti",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Never Let Me Go",
    "composer": "Livingston Jay"
  },
  {
    "title": "Never Will I Marry",
    "composer": "Loesser Frank"
  },
  {
    "title": "Nevertheless",
    "composer": "Kalmar-Ruby"
  },
  {
    "title": "New Picture",
    "composer": "Heath Jimmy"
  },
  {
    "title": "New York, New York",
    "composer": "Kander John"
  },
  {
    "title": "Nica's Dream",
    "composer": "Silver Horace"
  },
  {
    "title": "Nice 'n Easy",
    "composer": "Spence-Bergman-Keith"
  },
  {
    "title": "Nice Work If You Can Get It",
    "composer": "Gershwin George"
  },
  {
    "title": "Nicolette",
    "composer": "Wheeler Kenny"
  },
  {
    "title": "Night And Day",
    "composer": "Porter Cole"
  },
  {
    "title": "Night Dreamer",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Night Has A Thousand Eyes (Coltrane Changes), The",
    "composer": "Jerry-Brainin"
  },
  {
    "title": "Night Has A Thousand Eyes, The",
    "composer": "Jerry-Brainin"
  },
  {
    "title": "Night We Called It A Day, The",
    "composer": "Dennis Matt"
  },
  {
    "title": "No Moe",
    "composer": "Rollins Sonny"
  },
  {
    "title": "No Moon At All",
    "composer": "Mann David"
  },
  {
    "title": "No Splice",
    "composer": "Konitz Lee"
  },
  {
    "title": "Nobody Else But Me",
    "composer": "Kern Jerome"
  },
  {
    "title": "Nobody Knows You When You're Down And Out",
    "composer": "Cox Jimmy"
  },
  {
    "title": "Nostalgia",
    "composer": "Navarro Fats"
  },
  {
    "title": "Nostalgia In Times Square",
    "composer": "Mingus Charles"
  },
  {
    "title": "Nothing Personal",
    "composer": "Grolnick Don"
  },
  {
    "title": "November 15",
    "composer": "Garrett Kenny"
  },
  {
    "title": "Now's The Time",
    "composer": "Parker Charlie"
  },
  {
    "title": "Nuages",
    "composer": "Reinhardt Django"
  },
  {
    "title": "Nutty",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Nutville",
    "composer": "Silver Horace"
  },
  {
    "title": "O Grande Amor",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Oblivion",
    "composer": "Powell Bud"
  },
  {
    "title": "Odd Couple, The",
    "composer": "Hefti Neal"
  },
  {
    "title": "Off Minor",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Oh, Lady Be Good",
    "composer": "Gershwin George"
  },
  {
    "title": "Oh, What A Beautiful Mornin'",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Oh! Look At Me Now",
    "composer": "DeVries-Bushkin"
  },
  {
    "title": "Ol' Man River",
    "composer": "Kern Jerome"
  },
  {
    "title": "Old Cape Cod",
    "composer": "Rothrock-Vakus-Jeffrey"
  },
  {
    "title": "Old Country, The",
    "composer": "Adderley-Lewis"
  },
  {
    "title": "Old Devil Moon",
    "composer": "Lane Burton"
  },
  {
    "title": "Old Folks",
    "composer": "Robison Willard"
  },
  {
    "title": "Oleo",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Oliloqui Valley",
    "composer": "Hancock Herbie"
  },
  {
    "title": "On A Clear Day",
    "composer": "Lane Burton"
  },
  {
    "title": "On A Misty Night",
    "composer": "Dameron Tadd"
  },
  {
    "title": "On A Slow Boat To China",
    "composer": "Loesser Frank"
  },
  {
    "title": "On Broadway",
    "composer": "Mann-Weil-Stoller-Leiber"
  },
  {
    "title": "On Green Dolphin Street",
    "composer": "Kaper Bronislau"
  },
  {
    "title": "On The Street Where You Live",
    "composer": "Loewe Frederick"
  },
  {
    "title": "On The Sunny Side Of The Street",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "On The Trail",
    "composer": "Grofe Ferde"
  },
  {
    "title": "Once I Loved",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Once In A While",
    "composer": "Edwards Michael"
  },
  {
    "title": "Once Upon A Summertime (La Valse Des Lilas)",
    "composer": "Legrand-Barclay-Marnay-Mercer"
  },
  {
    "title": "One By One",
    "composer": "Shorter Wayne"
  },
  {
    "title": "One Finger Snap",
    "composer": "Hancock Herbie"
  },
  {
    "title": "One Foot In The Gutter",
    "composer": "Terry Clark"
  },
  {
    "title": "One For My Baby",
    "composer": "Arlen Harold"
  },
  {
    "title": "One I Love (Belongs To Somebody Else), The",
    "composer": "Jones Isham"
  },
  {
    "title": "One Morning In May",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "One Note Samba",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Only Trust Your Heart",
    "composer": "Carter Benny"
  },
  {
    "title": "Onmo",
    "composer": "Wheeler Kenny"
  },
  {
    "title": "Opener, The",
    "composer": "Evans Bill"
  },
  {
    "title": "Opus De Funk",
    "composer": "Silver Horace"
  },
  {
    "title": "Orange Colored Sky",
    "composer": "DeLugg-Stein"
  },
  {
    "title": "Oriental Folk Song",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Ornithology",
    "composer": "Parker Charlie"
  },
  {
    "title": "Our Delight",
    "composer": "Dameron Tad"
  },
  {
    "title": "Our Love is Here to Stay",
    "composer": "Gershwin George"
  },
  {
    "title": "Out Of Nowhere",
    "composer": "Green Johnny"
  },
  {
    "title": "Out Of This World",
    "composer": "Arlen Harold"
  },
  {
    "title": "Over The Rainbow (Somewhere)",
    "composer": "Arlen Harold"
  },
  {
    "title": "P.S. I Love You",
    "composer": "Jenkins Gordon"
  },
  {
    "title": "Palo Alto",
    "composer": "Konitz Lee"
  },
  {
    "title": "Pannonica",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Paper Doll",
    "composer": "Black Johnny"
  },
  {
    "title": "Parisian Thoroughfare",
    "composer": "Powell Bud"
  },
  {
    "title": "Parker's Mood",
    "composer": "Parker Charlie"
  },
  {
    "title": "Party's Over, The",
    "composer": "Styne-Comden-Green"
  },
  {
    "title": "Passion Dance",
    "composer": "Tyner McCoy"
  },
  {
    "title": "Passion Flower",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Passport",
    "composer": "Parker Charlie"
  },
  {
    "title": "Peace",
    "composer": "Silver Horace"
  },
  {
    "title": "Peacocks, The",
    "composer": "Rowles Jimmy"
  },
  {
    "title": "Pee Wee",
    "composer": "Williams Tony"
  },
  {
    "title": "Peel Me A Grape",
    "composer": "Frishberg Dave"
  },
  {
    "title": "Peggy's Blue Skylight",
    "composer": "Mingus Charles"
  },
  {
    "title": "Pennies From Heaven",
    "composer": "Johnston Arthur"
  },
  {
    "title": "Pensativa",
    "composer": "Fischer Clare"
  },
  {
    "title": "Pent Up House",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Penthouse Serenade",
    "composer": "Jason-Burton"
  },
  {
    "title": "People",
    "composer": "Styne Jule"
  },
  {
    "title": "People Will Say We're In Love",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Perdido",
    "composer": "Tizol Juan"
  },
  {
    "title": "Perhaps",
    "composer": "Parker Charlie"
  },
  {
    "title": "Perhaps, Perhaps, Perhaps",
    "composer": "Farres-Davis"
  },
  {
    "title": "Peri's Scope",
    "composer": "Evans Bill"
  },
  {
    "title": "Petit Fleur",
    "composer": "Bechet Sidney"
  },
  {
    "title": "Pfrancing (No Blues)",
    "composer": "Davis Miles"
  },
  {
    "title": "Phase Dance",
    "composer": "Metheny Pat"
  },
  {
    "title": "Pick Yourself Up",
    "composer": "Kern Jerome"
  },
  {
    "title": "Ping Pong",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Pink Panther, The",
    "composer": "Mancini Henry"
  },
  {
    "title": "Pinocchio",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Played Twice",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Poinciana",
    "composer": "Simon Nat"
  },
  {
    "title": "Polkadots And Moonbeams",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Poor Butterfly",
    "composer": "Hubbell Raymon"
  },
  {
    "title": "Popsicle Toes",
    "composer": "Franks Michael"
  },
  {
    "title": "Portrait Of Jennie",
    "composer": "Burdge-Robinson"
  },
  {
    "title": "Preacher, The",
    "composer": "Silver Horace"
  },
  {
    "title": "Prelude To A Kiss",
    "composer": "Ellington Duke"
  },
  {
    "title": "Pretend",
    "composer": "Douglas-Parman-Lavere"
  },
  {
    "title": "Prince Of Darkness",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Prism",
    "composer": "Jarrett Keith"
  },
  {
    "title": "Progression",
    "composer": "Konitz Lee"
  },
  {
    "title": "Punjab",
    "composer": "Henderson Joe"
  },
  {
    "title": "Pure Imagination",
    "composer": "Newley Anthony"
  },
  {
    "title": "Pursuance",
    "composer": "Coltrane John"
  },
  {
    "title": "Put On A Happy Face",
    "composer": "Strouse Charles"
  },
  {
    "title": "Puttin' On The Ritz",
    "composer": "Berlin Irvin"
  },
  {
    "title": "Quasimodo",
    "composer": "Parker Charlie"
  },
  {
    "title": "Questar",
    "composer": "Jarrett Keith"
  },
  {
    "title": "Question And Answer",
    "composer": "Metheny Pat"
  },
  {
    "title": "Quiet Now",
    "composer": "Zeitlin Denny"
  },
  {
    "title": "Radio",
    "composer": "Swallow Steve"
  },
  {
    "title": "Rainbow Connection, The",
    "composer": "Williams-Ascher"
  },
  {
    "title": "Raincheck",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Re: Person I Knew",
    "composer": "Evans Bill"
  },
  {
    "title": "Recado Bossa Nova",
    "composer": "Ferreira Djalma"
  },
  {
    "title": "Recordame",
    "composer": "Henderson Joe"
  },
  {
    "title": "Red Clay",
    "composer": "Hubbard Freddie"
  },
  {
    "title": "Red Top",
    "composer": "Hampton Lionel"
  },
  {
    "title": "Reflections",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Reincarnation Of A Lovebird",
    "composer": "Mingus Charles"
  },
  {
    "title": "Relaxin' At Camarillo",
    "composer": "Parker Charlie"
  },
  {
    "title": "Remember",
    "composer": "Berlin Irving"
  },
  {
    "title": "Repetition",
    "composer": "Hefti Neal"
  },
  {
    "title": "Resolution",
    "composer": "Coltrane John"
  },
  {
    "title": "Rhythm-a-ning",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Road Song",
    "composer": "Montgomery Wes"
  },
  {
    "title": "Robbin's Nest",
    "composer": "Thompson-Jacquet"
  },
  {
    "title": "Rockin' Chair",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Room 608",
    "composer": "Silver Horace"
  },
  {
    "title": "Rose Room",
    "composer": "Hickman Art"
  },
  {
    "title": "Rosetta",
    "composer": "Hines Earl"
  },
  {
    "title": "Round Midnight",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Route 66",
    "composer": "Troup Bobby"
  },
  {
    "title": "Ruby, My Dear",
    "composer": "Monk Thelonious"
  },
  {
    "title": "S.O.S.",
    "composer": "Montgomery Wes"
  },
  {
    "title": "S' Wonderful",
    "composer": "Gershwin George"
  },
  {
    "title": "S'posin'",
    "composer": "Denniker Paul"
  },
  {
    "title": "Saga Of Harrison Crabfeathers, The",
    "composer": "Kuhn Steve"
  },
  {
    "title": "Sail Away",
    "composer": "Harrell Tom"
  },
  {
    "title": "Salt Peanuts",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "Samba De Orfeu",
    "composer": "Bonfa Luiz"
  },
  {
    "title": "San Francisco Holiday",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Sandu",
    "composer": "Brown Clifford"
  },
  {
    "title": "Satellite",
    "composer": "Coltrane John"
  },
  {
    "title": "Satin Doll",
    "composer": "Strayhorn-Ellington"
  },
  {
    "title": "Save Your Love For Me",
    "composer": "Johnson Buddy"
  },
  {
    "title": "Say It (Over And Over Again)",
    "composer": "Loesser Frank"
  },
  {
    "title": "Say the Brother's Name",
    "composer": "Metheny Pat"
  },
  {
    "title": "Scene",
    "composer": "Harrell Tom"
  },
  {
    "title": "Scotch And Soda",
    "composer": "Guard Dave"
  },
  {
    "title": "Scrapple From The Apple",
    "composer": "Parker Charlie"
  },
  {
    "title": "Sea Journey",
    "composer": "Corea Chick"
  },
  {
    "title": "Search For Peace",
    "composer": "Tyner McCoy"
  },
  {
    "title": "Second Star To The Right, The",
    "composer": "Fain Sammy"
  },
  {
    "title": "Second Time Around, The",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Secret Love",
    "composer": "Fain Sammy"
  },
  {
    "title": "Segment",
    "composer": "Parker Charlie"
  },
  {
    "title": "Señor Blues",
    "composer": "Silver Horace"
  },
  {
    "title": "Sentimental Journey",
    "composer": "Brown-Green-Homer"
  },
  {
    "title": "September In The Rain",
    "composer": "Warren Harry"
  },
  {
    "title": "September Song",
    "composer": "Weill Kurt"
  },
  {
    "title": "Serenade To A Cuckoo",
    "composer": "Kirk Roland"
  },
  {
    "title": "Serenade To A Soul Sister",
    "composer": "Silver Horace"
  },
  {
    "title": "Serene",
    "composer": "Dolphy Eric"
  },
  {
    "title": "Serenity",
    "composer": "Henderson Joe"
  },
  {
    "title": "Serpent's Tooth",
    "composer": "Davis Miles"
  },
  {
    "title": "Seven Come Eleven",
    "composer": "Goodman-Christian"
  },
  {
    "title": "Seven Steps To Heaven",
    "composer": "Feldman Victor"
  },
  {
    "title": "Shadow Of Your Smile, The",
    "composer": "Mandel Johnny"
  },
  {
    "title": "Shaw 'Nuff",
    "composer": "Parker Charlie"
  },
  {
    "title": "She's Funny That Way",
    "composer": "Daniels Charles"
  },
  {
    "title": "Shine",
    "composer": "Dabney-Mack-Brown"
  },
  {
    "title": "Shiny Stockings",
    "composer": "Foster Frank"
  },
  {
    "title": "Short Story",
    "composer": "Dorham Kenny"
  },
  {
    "title": "Shutterbug",
    "composer": "Johnson J.J."
  },
  {
    "title": "Si Si",
    "composer": "Parker Charlie"
  },
  {
    "title": "Sidewinder",
    "composer": "Morgan Lee"
  },
  {
    "title": "Silver's Serenade",
    "composer": "Silver Horace"
  },
  {
    "title": "Simone",
    "composer": "Foster Frank"
  },
  {
    "title": "Since I Fell For You",
    "composer": "Johnson Buddy"
  },
  {
    "title": "Sippin' At Bells",
    "composer": "Davis Miles"
  },
  {
    "title": "Sister Sadie",
    "composer": "Silver Horace"
  },
  {
    "title": "Skating In Central Park",
    "composer": "Lewis John"
  },
  {
    "title": "Skippy",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Skylark",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Skyliner",
    "composer": "Barnet Charlie"
  },
  {
    "title": "Slipped Disc",
    "composer": "Goodman Benny"
  },
  {
    "title": "Slow Hot Wind",
    "composer": "Mancini Henry"
  },
  {
    "title": "Smile",
    "composer": "Chaplin Charles"
  },
  {
    "title": "Smoke Gets In Your Eyes",
    "composer": "Kern Jerome"
  },
  {
    "title": "Smoke Rings",
    "composer": "Gifford-Washington"
  },
  {
    "title": "Sno' Peas",
    "composer": "Markowitz Phil"
  },
  {
    "title": "Só Danço Samba",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "So In Love",
    "composer": "Porter Cole"
  },
  {
    "title": "So Many Stars",
    "composer": "Mendez Sergio"
  },
  {
    "title": "So Nice (Summer Samba)",
    "composer": "Valles Marco"
  },
  {
    "title": "So Sorry Please",
    "composer": "Powell Bud"
  },
  {
    "title": "So Tender",
    "composer": "Jarrett Keith"
  },
  {
    "title": "So What",
    "composer": "Davis Miles"
  },
  {
    "title": "Social Call",
    "composer": "Gryce Gigi"
  },
  {
    "title": "Softly, As In A Morning Sunrise",
    "composer": "Romberg Sigmund"
  },
  {
    "title": "Solar",
    "composer": "Davis Miles"
  },
  {
    "title": "Solitude",
    "composer": "Ellington Duke"
  },
  {
    "title": "Some Enchanted Evening",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Some Other Blues",
    "composer": "Coltrane John"
  },
  {
    "title": "Some Other Spring",
    "composer": "Herzog-Kitchings"
  },
  {
    "title": "Some Other Time",
    "composer": "Bernstein Leonard"
  },
  {
    "title": "Somebody Loves Me",
    "composer": "Gershwin George"
  },
  {
    "title": "Someday My Prince Will Come",
    "composer": "Churchill Frank"
  },
  {
    "title": "Someday You'll Be Sorry",
    "composer": "Armstrong Louis"
  },
  {
    "title": "Someone To Watch Over Me",
    "composer": "Gershwin George"
  },
  {
    "title": "Sometime Ago",
    "composer": "Mikanovich Sergio"
  },
  {
    "title": "Sometimes I'm Happy",
    "composer": "Youmans Vincent"
  },
  {
    "title": "Somewhere",
    "composer": "Bernstein Leonard"
  },
  {
    "title": "Song For Bilbao",
    "composer": "Metheny Pat"
  },
  {
    "title": "Song For My Father",
    "composer": "Silver Horace"
  },
  {
    "title": "Song For My Lady",
    "composer": "Tyner McCoy"
  },
  {
    "title": "Song For Strayhorn",
    "composer": "Mulligan Gerry"
  },
  {
    "title": "Song Is You, The",
    "composer": "Kern Jerome"
  },
  {
    "title": "Sonnymoon For Two",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Soon",
    "composer": "Gershwin George"
  },
  {
    "title": "Sophisticated Lady",
    "composer": "Ellington Duke"
  },
  {
    "title": "Sorcerer, The",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Soul Eyes",
    "composer": "Waldron Mal"
  },
  {
    "title": "Soultrane",
    "composer": "Dameron Tadd"
  },
  {
    "title": "Sound Lee",
    "composer": "Konitz Lee"
  },
  {
    "title": "Spain",
    "composer": "Corea Chick"
  },
  {
    "title": "Speak Like A Child",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Speak Low",
    "composer": "Weill Kurt"
  },
  {
    "title": "Speak No Evil",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Spiral",
    "composer": "Coltrane John"
  },
  {
    "title": "Spring Can Really Hang You Up The Most",
    "composer": "Wolf Tommy"
  },
  {
    "title": "Spring Is Here",
    "composer": "Rodgers Richard"
  },
  {
    "title": "St. James Infirmary",
    "composer": "Primrose Joe"
  },
  {
    "title": "St. Louis Blues",
    "composer": "Handy W.C."
  },
  {
    "title": "St. Thomas",
    "composer": "Rollins Sonny"
  },
  {
    "title": "St. Vitus Dance, The",
    "composer": "Silver Horace"
  },
  {
    "title": "Stablemates",
    "composer": "Golson Benny"
  },
  {
    "title": "Stairway To The Stars",
    "composer": "Maineck Matt"
  },
  {
    "title": "Star Dust",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Star Eyes",
    "composer": "DePaul Gene"
  },
  {
    "title": "Star-Crossed Lovers, The",
    "composer": "Strayhorn-Ellington"
  },
  {
    "title": "Stars Fell On Alabama",
    "composer": "Perkins Frank"
  },
  {
    "title": "Stella By Starlight",
    "composer": "Young Victor"
  },
  {
    "title": "Stolen Moments",
    "composer": "Nelson Oliver"
  },
  {
    "title": "Stompin' At The Savoy",
    "composer": "Webb-Goodman-Sampson"
  },
  {
    "title": "Stormy Weather",
    "composer": "Arlen Harold"
  },
  {
    "title": "Straight Life",
    "composer": "Hubbard Freddie"
  },
  {
    "title": "Straight No Chaser",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Straight Street",
    "composer": "Coltrane John"
  },
  {
    "title": "Straighten Up And Fly Right",
    "composer": "Cole-Mills"
  },
  {
    "title": "Strange Meeting",
    "composer": "Frisell Bill"
  },
  {
    "title": "Strangers In The Night",
    "composer": "Kaempfert Bert"
  },
  {
    "title": "Strasbourg-St. Denis",
    "composer": "Hargrove Roy"
  },
  {
    "title": "Street Of Dreams",
    "composer": "Young Victor"
  },
  {
    "title": "Strike Up The Band",
    "composer": "Gershwin George"
  },
  {
    "title": "Strode Rode",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Strollin'",
    "composer": "Silver Horace"
  },
  {
    "title": "Struttin' With Some Barbecue",
    "composer": "Armstrong Lillian"
  },
  {
    "title": "Subconscious Lee",
    "composer": "Konitz Lee"
  },
  {
    "title": "Suddenly It's Spring",
    "composer": "Van-Heusen Jimmy"
  },
  {
    "title": "Sugar",
    "composer": "Turrentine Stanley"
  },
  {
    "title": "Summer Band Camp",
    "composer": "Goodrick Mick"
  },
  {
    "title": "Summer In Central Park",
    "composer": "Silver Horace"
  },
  {
    "title": "Summer Knows, The",
    "composer": "Legrand Michel"
  },
  {
    "title": "Summer Night",
    "composer": "Warren Harry"
  },
  {
    "title": "Summer Serenade",
    "composer": "Carter Benny"
  },
  {
    "title": "Summer Wind, The",
    "composer": "Meyer-Mercer"
  },
  {
    "title": "Summertime",
    "composer": "Gershwin George"
  },
  {
    "title": "Sun down",
    "composer": "Montgomery Wes"
  },
  {
    "title": "Sunny",
    "composer": "Hebb Bobby"
  },
  {
    "title": "Sunshower",
    "composer": "Barron Kenny"
  },
  {
    "title": "Surrey With The Fringe On The Top",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Sway",
    "composer": "Ruiz-Gimbel"
  },
  {
    "title": "Sweeping Up",
    "composer": "Swallow Steve"
  },
  {
    "title": "Sweet And Lovely",
    "composer": "Arnheim-Daniels-Tobias"
  },
  {
    "title": "Sweet Georgia Bright",
    "composer": "Lloyd Charles"
  },
  {
    "title": "Sweet Georgia Brown",
    "composer": "Pinkard-Casey-Bernie"
  },
  {
    "title": "Sweet Lorraine",
    "composer": "Burwell Cliff"
  },
  {
    "title": "Sweet Sue, Just You",
    "composer": "Harris-Young"
  },
  {
    "title": "Sweetest Sounds, The",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Swinging At The Haven",
    "composer": "Marsalis Ellis"
  },
  {
    "title": "Swinging Shepherd Blues, The",
    "composer": "Koffman-Roberts-Jacobson"
  },
  {
    "title": "Tadd's Delight",
    "composer": "Dameron Tadd"
  },
  {
    "title": "Take Five",
    "composer": "Desmond Paul"
  },
  {
    "title": "Take The A Train",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Taking A Chance On Love",
    "composer": "Duke Vernon"
  },
  {
    "title": "Tangerine",
    "composer": "Schertzinger Victor"
  },
  {
    "title": "Tautology",
    "composer": "Konitz Lee"
  },
  {
    "title": "Tea For Two",
    "composer": "Youmans Vincent"
  },
  {
    "title": "Teach Me Tonight",
    "composer": "DePaul Gene"
  },
  {
    "title": "Tell Me A Bedtime Story",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Tempus Fugit",
    "composer": "Powell Bud"
  },
  {
    "title": "Tenderly",
    "composer": "Gross Walter"
  },
  {
    "title": "Tenor Madness",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Terra Nova",
    "composer": "Rosenwinkel Kurt"
  },
  {
    "title": "Thanks For The Memory",
    "composer": "Robin Leo"
  },
  {
    "title": "That Old Black Magic",
    "composer": "Arlen Harold"
  },
  {
    "title": "That Old Feeling",
    "composer": "Brown-Fain"
  },
  {
    "title": "That Ole Devil Called Love",
    "composer": "Fisher Doris"
  },
  {
    "title": "That's All",
    "composer": "Haymes-Brandt"
  },
  {
    "title": "That's Amore (That's Love)",
    "composer": "Warren-Brooks"
  },
  {
    "title": "That's Life",
    "composer": "Kay-Gordon"
  },
  {
    "title": "Thelonious",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Them There Eyes",
    "composer": "Tracy-Tauber-Pinkard"
  },
  {
    "title": "Theme For Ernie",
    "composer": "Lacey Fred"
  },
  {
    "title": "Theme From Family Guy",
    "composer": "Murphy-MacFarlane-Zuckerman"
  },
  {
    "title": "Theme, The",
    "composer": "Davis Miles"
  },
  {
    "title": "There Is No Greater Love",
    "composer": "Jones Isham"
  },
  {
    "title": "There Will Never Be Another You",
    "composer": "Warren Harry"
  },
  {
    "title": "There'll Be Some Changes Made",
    "composer": "Overstreet Benton"
  },
  {
    "title": "There's A Lull In My Life",
    "composer": "Revel Harry"
  },
  {
    "title": "There's A Small Hotel",
    "composer": "Rodgers Richard"
  },
  {
    "title": "There's No You",
    "composer": "Hopper Hal"
  },
  {
    "title": "These Are Soulful Days",
    "composer": "Massey Cal"
  },
  {
    "title": "These Foolish Things",
    "composer": "Strachey-Link"
  },
  {
    "title": "They All Laughed",
    "composer": "Gershwin George"
  },
  {
    "title": "They Can't Take That Away From Me",
    "composer": "Gershwin George"
  },
  {
    "title": "They Didn't Believe Me",
    "composer": "Kern Jerome"
  },
  {
    "title": "They Say It's Wonderful",
    "composer": "Berlin Irving"
  },
  {
    "title": "Things Ain't What They Used To Be",
    "composer": "Ellington Duke"
  },
  {
    "title": "Things We Did Last Summer, The",
    "composer": "Cahn-Styne"
  },
  {
    "title": "Think Of One",
    "composer": "Monk Thelonious"
  },
  {
    "title": "This Can't Be Love",
    "composer": "Rodgers Richard"
  },
  {
    "title": "This Could Be The Start Of Something Big",
    "composer": "Allen Steve"
  },
  {
    "title": "This Here",
    "composer": "Timmons Bobby"
  },
  {
    "title": "This I Dig Of You",
    "composer": "Mobley Hank"
  },
  {
    "title": "This Is All I Ask",
    "composer": "Jenkins Gordon"
  },
  {
    "title": "This is for Albert",
    "composer": "Shorter Wayne"
  },
  {
    "title": "This Is New",
    "composer": "Weill Kurt"
  },
  {
    "title": "This Masquerade",
    "composer": "Russell Leon"
  },
  {
    "title": "This Time The Dream's On Me",
    "composer": "Arlen Harold"
  },
  {
    "title": "This Year's Kisses",
    "composer": "Berlin Irving"
  },
  {
    "title": "Thou Swell",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Three Flowers",
    "composer": "Tyner McCoy"
  },
  {
    "title": "Three Little Words",
    "composer": "Ruby Harry"
  },
  {
    "title": "Thrill Is Gone, The",
    "composer": "Henderson Ray"
  },
  {
    "title": "Thriving From A Riff",
    "composer": "Parker Charlie"
  },
  {
    "title": "Tickle-Toe",
    "composer": "Young Lester"
  },
  {
    "title": "Till There Was You",
    "composer": "Wilson Meredith"
  },
  {
    "title": "Time After Time",
    "composer": "Styne Jule"
  },
  {
    "title": "Time On My Hands",
    "composer": "Youmans Vincent"
  },
  {
    "title": "Time Remembered",
    "composer": "Evans Bill"
  },
  {
    "title": "Tin Tin Deo",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "Tiny Capers",
    "composer": "Brown Clifford"
  },
  {
    "title": "Tippin'",
    "composer": "Silver Horace"
  },
  {
    "title": "Tis Autumn",
    "composer": "Nemo Henry"
  },
  {
    "title": "Tokyo Blues",
    "composer": "Silver Horace"
  },
  {
    "title": "Tones For Joan's Bones",
    "composer": "Corea Chick"
  },
  {
    "title": "Tonight",
    "composer": "Bernstein-Sondheim"
  },
  {
    "title": "Tonight I Shall Sleep",
    "composer": "Ellington-Mercer"
  },
  {
    "title": "Tonight You Belong To Me",
    "composer": "Rose-David"
  },
  {
    "title": "Too Close For Comfort",
    "composer": "Bock-Weiss-Holofcener"
  },
  {
    "title": "Too Marvelous For Words",
    "composer": "Whiting Richard"
  },
  {
    "title": "Too Young",
    "composer": "Lippman-Dee"
  },
  {
    "title": "Too Young To Go Steady",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "Topsy",
    "composer": "Battle-Durham"
  },
  {
    "title": "Touch Of Your Lips, The",
    "composer": "Noble Ray"
  },
  {
    "title": "Tour De Force",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "Toy Tune",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Toys",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Training",
    "composer": "Petrucciani Michel"
  },
  {
    "title": "Trane’s Blues",
    "composer": "Coltrane John"
  },
  {
    "title": "Travels",
    "composer": "Metheny Pat"
  },
  {
    "title": "Tricotism",
    "composer": "Pettiford Oscar"
  },
  {
    "title": "Trinkle Tinkle",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Triste",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Troubled Waters",
    "composer": "Johnston Arthur"
  },
  {
    "title": "Try A Little Tenderness",
    "composer": "Woods Harry"
  },
  {
    "title": "Tune Up",
    "composer": "Davis Miles"
  },
  {
    "title": "Turn Out The Stars",
    "composer": "Evans Bill"
  },
  {
    "title": "Turnaround",
    "composer": "Coleman Ornette"
  },
  {
    "title": "Twisted",
    "composer": "Gray Wardell"
  },
  {
    "title": "Twisted Blues",
    "composer": "Montgomery Wes"
  },
  {
    "title": "Two For The Road",
    "composer": "Mancini Henry"
  },
  {
    "title": "Two Not One",
    "composer": "Tristano Lennie"
  },
  {
    "title": "Two Sleepy People",
    "composer": "Carmichael Hoagy"
  },
  {
    "title": "Ugly Beauty",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Un Poco Loco",
    "composer": "Powell Bud"
  },
  {
    "title": "Unconditional Love",
    "composer": "Allen Geri"
  },
  {
    "title": "Undecided",
    "composer": "Shavers Charlie"
  },
  {
    "title": "Under A Blanket Of Blue",
    "composer": "Livingston Jerry"
  },
  {
    "title": "Unforgettable",
    "composer": "Irving Gordon"
  },
  {
    "title": "Unit Seven",
    "composer": "Jones Sam"
  },
  {
    "title": "United",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Unity Village",
    "composer": "Metheny Pat"
  },
  {
    "title": "Unrequited",
    "composer": "Mehldau Brad"
  },
  {
    "title": "Up Jumped Spring",
    "composer": "Hubbard Freddie"
  },
  {
    "title": "Up With The Lark",
    "composer": "Kern Jerome"
  },
  {
    "title": "Upper Manhattan Medical Group",
    "composer": "Strayhorn Billy"
  },
  {
    "title": "Valse Hot",
    "composer": "Rollins Sonny"
  },
  {
    "title": "Very Early",
    "composer": "Evans Bill"
  },
  {
    "title": "Very Thought Of You, The",
    "composer": "Noble Ray"
  },
  {
    "title": "Violets For Your Furs",
    "composer": "Adair-Dennis"
  },
  {
    "title": "Virgo",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Virgo (Silver)",
    "composer": "Silver Horace"
  },
  {
    "title": "Voyage",
    "composer": "Barron Kenny"
  },
  {
    "title": "Wabash",
    "composer": "Adderley Cannonball"
  },
  {
    "title": "Wait Till You See Her",
    "composer": "Rodgers Richard"
  },
  {
    "title": "Walk Tall",
    "composer": "Adderley Cannonball"
  },
  {
    "title": "Walkin'",
    "composer": "Davis Miles"
  },
  {
    "title": "Walkin' My Baby Back Home",
    "composer": "Ahlert-Turk"
  },
  {
    "title": "Walkin' Shoes",
    "composer": "Mulligan Gerry"
  },
  {
    "title": "Walkin' up",
    "composer": "Evans Bill"
  },
  {
    "title": "Waltz For Debby",
    "composer": "Evans Bill"
  },
  {
    "title": "Waltz For Ruth",
    "composer": "Haden Charlie"
  },
  {
    "title": "Warm Valley",
    "composer": "Ellington Duke"
  },
  {
    "title": "Watch What Happens",
    "composer": "Legrand Michel"
  },
  {
    "title": "Watermelon Man",
    "composer": "Hancock Herbie"
  },
  {
    "title": "Wave",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Way You Look Tonight, The",
    "composer": "Kern Jerome"
  },
  {
    "title": "Wayne's Thang",
    "composer": "Garrett Kenny"
  },
  {
    "title": "We See",
    "composer": "Monk Thelonious"
  },
  {
    "title": "We Will Meet Again",
    "composer": "Evans Bill"
  },
  {
    "title": "We'll Be Together Again",
    "composer": "Fisher Carl"
  },
  {
    "title": "Webb City",
    "composer": "Powell Bud"
  },
  {
    "title": "Well You Needn't",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Wendy",
    "composer": "Desmond Paul"
  },
  {
    "title": "West Coast Blues",
    "composer": "Montgomery Wes"
  },
  {
    "title": "What A Difference A Day Made",
    "composer": "Grever Maria"
  },
  {
    "title": "What A Little Moonlight Can Do",
    "composer": "Woods Harry"
  },
  {
    "title": "What A Wonderful World",
    "composer": "Weiss-Thiele"
  },
  {
    "title": "What Are You Doing New Year's Eve?",
    "composer": "Loesser Frank"
  },
  {
    "title": "What Are You Doing The Rest Of Your Life?",
    "composer": "Legrand Michel"
  },
  {
    "title": "What Is This Thing Called Love",
    "composer": "Porter Cole"
  },
  {
    "title": "What'll I Do",
    "composer": "Berlin Irving"
  },
  {
    "title": "What's New",
    "composer": "Haggard Bob"
  },
  {
    "title": "When I Fall In Love",
    "composer": "Young Victor"
  },
  {
    "title": "When It Rains",
    "composer": "Mehldau Brad"
  },
  {
    "title": "When It's Sleepy Time Down South",
    "composer": "Traditional"
  },
  {
    "title": "When Lights Are Low",
    "composer": "Carter Benny"
  },
  {
    "title": "When Sunny Gets Blue",
    "composer": "Fisher Marvin"
  },
  {
    "title": "When The Saints Go Marching In",
    "composer": "Traditional"
  },
  {
    "title": "When The Sun Comes Out",
    "composer": "Arlen Harold"
  },
  {
    "title": "When You Wish Upon A Star",
    "composer": "Harline Leigh"
  },
  {
    "title": "When You're Smilin'",
    "composer": "Shay - Fisher - Goodwin"
  },
  {
    "title": "When Your Lover Has Gone",
    "composer": "Swan E.A."
  },
  {
    "title": "Where Are You?",
    "composer": "McHugh Jimmy"
  },
  {
    "title": "Where Or When",
    "composer": "Rodgers Richard"
  },
  {
    "title": "While We're Young",
    "composer": "Wilder-Palitz"
  },
  {
    "title": "Whisper Not",
    "composer": "Golson Benny"
  },
  {
    "title": "Who Can I Turn To",
    "composer": "Newley-Bricusse"
  },
  {
    "title": "Who Cares",
    "composer": "Gershwin George"
  },
  {
    "title": "Who's Sorry Now?",
    "composer": "Snyder-Kalmar-Ruby"
  },
  {
    "title": "Why Do I Love You?",
    "composer": "Kern Jerome"
  },
  {
    "title": "Why Don't You Do Right?",
    "composer": "McCoy Kansas-Joe"
  },
  {
    "title": "Wild Flower",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Will You Still Be Mine?",
    "composer": "Dennis Matt"
  },
  {
    "title": "Willow Weep For Me",
    "composer": "Ronell Ann"
  },
  {
    "title": "Windows",
    "composer": "Corea Chick"
  },
  {
    "title": "Witch Hunt",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Witchcraft",
    "composer": "Coleman Cy"
  },
  {
    "title": "With A Song In My Heart",
    "composer": "Rodgers Richard"
  },
  {
    "title": "With The Wind And The Rain In Your Hair",
    "composer": "Edwards Clare"
  },
  {
    "title": "Without A Song",
    "composer": "Youmans Vincent"
  },
  {
    "title": "Without A Song (Joe Henderson Changes)",
    "composer": "Youmans Vincent"
  },
  {
    "title": "Wives And Lovers",
    "composer": "Bacharach Burt"
  },
  {
    "title": "Woody'n You",
    "composer": "Gillespie Dizzy"
  },
  {
    "title": "Work",
    "composer": "Monk Thelonious"
  },
  {
    "title": "Work Song",
    "composer": "Adderley Nat"
  },
  {
    "title": "Wouldn't It Be Loverly",
    "composer": "Loewe Frederick"
  },
  {
    "title": "Wow",
    "composer": "Tristano Lennie"
  },
  {
    "title": "Wrap Your Troubles In Dreams",
    "composer": "Barris Harry"
  },
  {
    "title": "Yardbird Suite",
    "composer": "Parker Charlie"
  },
  {
    "title": "Yes And No",
    "composer": "Shorter Wayne"
  },
  {
    "title": "Yesterday's Gardenias",
    "composer": "Mysels Robertson"
  },
  {
    "title": "Yesterdays",
    "composer": "Kern Jerome"
  },
  {
    "title": "You And The Night And The Music",
    "composer": "Schwartz Arthur"
  },
  {
    "title": "You Are Too Beautiful",
    "composer": "Rodgers Richard"
  },
  {
    "title": "You Better Go Now",
    "composer": "Reichner-Graham"
  },
  {
    "title": "You Better Leave It Alone",
    "composer": "Jordan Clifford"
  },
  {
    "title": "You Brought A New Kind Of Love To Me",
    "composer": "Fain-Kaval-Norman"
  },
  {
    "title": "You Can Depend On Me",
    "composer": "Carpenter-Dunlap-Hines"
  },
  {
    "title": "You Do Something To Me",
    "composer": "Porter Cole"
  },
  {
    "title": "You Don't Know What Love Is",
    "composer": "Raye-DePaul"
  },
  {
    "title": "You Go To My Head",
    "composer": "Coots Fred"
  },
  {
    "title": "You Keep Coming Back Like A Song",
    "composer": "Berlin Irving"
  },
  {
    "title": "You Know I Care",
    "composer": "Pearson Duke"
  },
  {
    "title": "You Made Me Love You",
    "composer": "Monaco James"
  },
  {
    "title": "You Make Me Feel So Young",
    "composer": "Myrow Josef"
  },
  {
    "title": "You Must Believe In Spring",
    "composer": "Legrand Michel"
  },
  {
    "title": "You Stepped Out Of A Dream",
    "composer": "Nacio-Herb-Brown"
  },
  {
    "title": "You Taught My Heart To Sing",
    "composer": "Tyner McCoy"
  },
  {
    "title": "You Took Advantage Of Me",
    "composer": "Rodgers Richard"
  },
  {
    "title": "You Turned The Tables on Me",
    "composer": "Alter Louis"
  },
  {
    "title": "You Won't Forget Me",
    "composer": "Goell-Spielman"
  },
  {
    "title": "You'd Be So Nice To Come Home To",
    "composer": "Porter Cole"
  },
  {
    "title": "You're Blasé",
    "composer": "Hamilton Ord"
  },
  {
    "title": "You're Everything",
    "composer": "Corea Chick"
  },
  {
    "title": "You're Laughing At Me",
    "composer": "Berlin Irving"
  },
  {
    "title": "You're My Everything",
    "composer": "Warren Harry"
  },
  {
    "title": "You're My Thrill",
    "composer": "Gorney Jay"
  },
  {
    "title": "You're Nobody Till Somebody Loves You",
    "composer": "Morgan-Stock-Cavanaugh"
  },
  {
    "title": "You're The Top",
    "composer": "Porter Cole"
  },
  {
    "title": "You've Changed",
    "composer": "Fisher Carl"
  },
  {
    "title": "Young And Foolish",
    "composer": "Hague Albert"
  },
  {
    "title": "Young At Heart",
    "composer": "Richards Johnny"
  },
  {
    "title": "Yours Is My Heart Alone",
    "composer": "Lehar Franz"
  },
  {
    "title": "Zhivago",
    "composer": "Rosenwinkel Kurt"
  },
  {
    "title": "Zing Went The Strings Of My Heart",
    "composer": "Hanley James"
  },
  {
    "title": "Zingaro (Retrato Em Branco E Preto)",
    "composer": "Jobim Antonio-Carlos"
  },
  {
    "title": "Zoltan",
    "composer": "Shaw Woody"
  }
];

  const api = {
    STANDARD_SONGS,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.JazzStandardSongs = api;
})(typeof window !== "undefined" ? window : globalThis);
