const Welcome = (message) => {

  const showNotification = () => {
    new Notification("New message from Planlı-yaşa !", {
      body: message
    });
  };
  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification();
      }
    });
  }
};

export default Welcome;

