DROP TABLE IF EXISTS movies;

CREATE TABLE
    movies (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        director VARCHAR(255) NOT NULL,
        year VARCHAR(255) NOT NULL,
        studio VARCHAR(255) NOT NULL,
        duration INT NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
    movies (title, director, year, studio, duration)
VALUES
    (
        "Captain America: The First Avenger",
        "Joe Johnston",
        "2011",
        "Marvel Studios",
        124
    ),
    (
        "Captain Marvel",
        "Anna Boden, Ryan Fleck",
        "2019",
        "Marvel Studios",
        124
    ),
    (
        "Iron Man",
        "Jon Favreau",
        "2008",
        "Marvel Studios",
        126
    ),
    (
        "Iron Man 2",
        "Jon Favreau",
        "2010",
        "Marvel Studios",
        124
    ),
    (
        "The Incredible Hulk",
        "Louis Leterrier",
        "2008",
        "Marvel Studios",
        112
    ),
    (
        "Thor",
        "Kenneth Branagh",
        "2011",
        "Marvel Studios",
        115
    ),
    (
        "The Avengers",
        "Joss Whedon",
        "2012",
        "Marvel Studios",
        143
    ),
    (
        "Thor: The Dark World",
        "Alan Taylor",
        "2013",
        "Marvel Studios",
        112
    ),
    (
        "Iron Man 3",
        "Shane Black",
        "2013",
        "Marvel Studios",
        130
    ),
    (
        "Captain America: The Winter Soldier",
        "Anthony Russo, Joe Russo",
        "2014",
        "Marvel Studios",
        136
    ),
    (
        "Guardians of the Galaxy",
        "James Gunn",
        "2014",
        "Marvel Studios",
        121
    ),
    (
        "Guardians of the Galaxy Vol. 2",
        "James Gunn",
        "2017",
        "Marvel Studios",
        136
    ),
    (
        "Avengers: Age of Ultron",
        "Joss Whedon",
        "2015",
        "Marvel Studios",
        141
    ),
    (
        "Ant-man",
        "Peyton Reed",
        "2015",
        "Marvel Studios",
        117
    ),
    (
        "Captain America: Civil War",
        "Anthony Russo, Joe Russo",
        "2016",
        "Marvel Studios",
        147
    ),
    (
        "Black Widow",
        "Cate Shortland",
        "2021",
        "Marvel Studios",
        133
    ),
    (
        "Black Panther",
        "Ryan Coogler",
        "2018",
        "Marvel Studios",
        134
    ),
    (
        "Spider-man: Homecoming",
        "Jon Watts",
        "2017",
        "Marvel Studios",
        133
    ),
    (
        "Doctor Strange",
        "Scott Derrickson",
        "2016",
        "Marvel Studios",
        115
    ),
    (
        "Thor: Ragnarok",
        "Taika Waititi",
        "2017",
        "Marvel Studios",
        130
    ),
    (
        "Ant-man and the Wasp",
        "Peyton Reed",
        "2018",
        "Marvel Studios",
        118
    ),
    (
        "Avengers: Infinity War",
        "Anthony Russo, Joe Russo",
        "2018",
        "Marvel Studios",
        149
    ),
    (
        "Avengers: Endgame",
        "Anthony Russo, Joe Russo",
        "2019",
        "Marvel Studios",
        181
    ),
    (
        "Shang-chi and the Legend of the Ten Rings",
        "Destin Daniel Cretton",
        "2021",
        "Marvel Studios",
        132
    ),
    (
        "Spider-man: Far From Home",
        "Jon Watts",
        "2019",
        "Marvel Studios",
        129
    ),
    (
        "Eternals",
        "Chloe Zhao",
        "2021",
        "Marvel Studios",
        157
    ),
    (
        "Doctor Strange in the Multiverse of Madness",
        "Sam Raimi",
        "2022",
        "Marvel Studios",
        132
    ),
    (
        "Black Panther: Wakanda Forever",
        "Ryan Coogler",
        "2022",
        "Marvel Studios",
        132
    ),
    (
        "Thor: Love and Thunder",
        "Taika Waititi",
        "2022",
        "Marvel Studios",
        132
    ),
    (
        "Ant-man and the Wasp: Quantumania",
        "Peyton Reed",
        "2023",
        "Marvel Studios",
        132
    ),
    (
        "Guardians of the Galaxy Vol. 3",
        "James Gunn",
        "2023",
        "Marvel Studios",
        132
    );