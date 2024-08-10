

export function capitalizeFirstLetter(word : string) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function truncateText(text: string | undefined, wordLimit: number) {
    if (!text) {
        return '';
    }
    const words = text.split(' ');
    if (words.length <= wordLimit) {
        return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
}

export function formatDate(data: Date | undefined):string {
if (!data) {
    return '';
}
const formattedDate = new Date(data).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
return  formattedDate;
}