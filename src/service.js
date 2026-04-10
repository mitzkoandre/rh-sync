import axios from "axios";

const API_URL = "https://randomuser.me/api";

export async function fetchUsers() {
    const response = await axios.get(
        `${API_URL}?results=150`
    );

    return response.data.results;
}

export function filterAdults(users) {
    return users.filter(user => user.dob.age >= 18);
}

export function mapUser(user) {
    return {
        email: user.email,
        fullName: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        age: user.dob.age,
        country: user.location.country,
        city: user.location.city,
        phone: user.phone,
        picture: user.picture.large,
        registered_date: user.registered.date
    };
}