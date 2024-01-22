export const partOfTheDay = () => {
    const date = new Date();
    const hours = date.getHours();

    const emojis = {
        morning: '☕',
        afternoon: '🌞',
        evening: '🌙',
    };

    if (hours < 12) {
        return { greeting: 'Good morning', emoji: emojis.morning };
    } else if (hours >= 12 && hours < 17) {
        return { greeting: 'Good afternoon', emoji: emojis.afternoon };
    } else {
        return { greeting: 'Good evening', emoji: emojis.evening };
    }
}