export default function CreateLocalStorage() {
  if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }

  if (!localStorage.getItem('following')) {
    localStorage.setItem('following', JSON.stringify([]));
  }
}