export default function CreateLocalStorage() {
  if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }

  if (!localStorage.getItem('following')) {
    localStorage.setItem('following', JSON.stringify([]));
  }
  if (!localStorage.getItem('history')) {
    localStorage.setItem('history', JSON.stringify([]));
  }
}