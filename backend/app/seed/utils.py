from random import choice, randint
from faker import Faker

fake = Faker("en_IN")


CATEGORIES = [
    "Running",
    "Football",
    "Cricket",
    "Fitness",
    "Gym",
    "Cycling",
    "Basketball",
    "Badminton",
]


PRODUCT_NAMES = {
    "Running": [
        "Running Shoes Pro",
        "Marathon Shoes",
        "Trail Running Shoes",
        "Sports Socks",
        "Compression Socks",
        "Running Shorts",
        "Running Jacket",
        "Hydration Belt",
        "Running Cap",
        "Running Gloves",
    ],
    "Football": [
        "Football",
        "Football Boots",
        "Goalkeeper Gloves",
        "Football Jersey",
        "Training Cones",
        "Shin Guards",
        "Captain Armband",
        "Football Bag",
    ],
    "Cricket": [
        "Cricket Bat",
        "English Willow Bat",
        "Tennis Ball",
        "Leather Ball",
        "Helmet",
        "Batting Gloves",
        "Leg Pads",
        "Abdominal Guard",
        "Kit Bag",
        "Grip Tape",
    ],
    "Gym": [
        "Dumbbells",
        "Barbell",
        "Bench Press",
        "Gym Bag",
        "Resistance Band",
        "Foam Roller",
        "Weight Plates",
        "Pull-up Bar",
        "Skipping Rope",
    ],
    "Cycling": [
        "Cycling Helmet",
        "Bike Pump",
        "Bike Bottle",
        "Bike Light",
        "Cycling Gloves",
        "Cycling Jersey",
        "Bike Lock",
        "Cycle Bell",
    ],
    "Fitness": [
        "Yoga Mat",
        "Protein Shaker",
        "Kettlebell",
        "Medicine Ball",
        "Fitness Tracker",
        "Resistance Tube",
        "Exercise Ball",
    ],
    "Basketball": [
        "Basketball",
        "Basketball Shoes",
        "Basketball Jersey",
        "Knee Sleeve",
        "Basketball Hoop Net",
    ],
    "Badminton": [
        "Badminton Racket",
        "Carbon Racket",
        "Shuttlecock Pack",
        "Grip Tape",
        "Badminton Shoes",
        "Badminton Kit Bag",
    ],
}

FIRST_NAMES = [
    "Rahul",
    "Amit",
    "Rohit",
    "Neha",
    "Sneha",
    "Priya",
    "Ankit",
    "Vikas",
    "Pooja",
    "Riya",
    "Arjun",
    "Karan",
    "Akash",
    "Meera",
]


LAST_NAMES = [
    "Sharma",
    "Patel",
    "Gupta",
    "Singh",
    "Verma",
    "Kapoor",
    "Yadav",
    "Jain",
    "Kumar",
]


def random_customer_name():
    return f"{choice(FIRST_NAMES)} {choice(LAST_NAMES)}"


def random_email(name: str):
    username = (
        name.lower()
        .replace(" ", ".")
        .replace("'", "")
    )

    return f"{username}{randint(1,999)}@gmail.com"


def random_phone():
    return f"9{randint(100000000,999999999)}"


def random_category():
    return choice(CATEGORIES)


def random_product():
    category = random_category()

    return (
        choice(PRODUCT_NAMES[category]),
        category,
    )


def random_price():
    return randint(199, 9999)


def random_stock():
    return randint(10, 300)


def random_order_quantity():
    return randint(1, 4)


def random_discount():
    return choice([0, 5, 10, 15, 20])


def random_confidence():
    return randint(70, 99)


def random_expected_revenue():
    return randint(5000, 100000)


def random_risk():
    return choice(
        [
            "low",
            "medium",
            "high",
        ]
    )


def random_bool():
    return choice([True, False])