export default function addStorage(key, value) {
  const data = JSON.parse(localStorage.getItem(key)) || [];

  const index = data.findIndex(item => item.id === value.id);

  if (index === -1) {
    const updated = [value, ...data];
    localStorage.setItem(key, JSON.stringify(updated));
  } else {
    data.splice(index, 1); 
    localStorage.setItem(key, JSON.stringify(data));
  }
  
}
