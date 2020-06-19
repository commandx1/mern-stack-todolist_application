const Bildirim = (missionDate, mission) => {
  let days;
  let minutes;
  let hours;
  let distance;
  let seconds;

  const date1 = new Date(missionDate).getTime();

  const showNotification = () => {
    const notification = new Notification("New message from Planlı-yaşa !", {
      body:
        distance < 0
          ? `${mission} için zaman doldu... :(`
          : `Hey dostum, nasılsın bakalım?? :) ${mission} için kalan süre: ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye `,
    });
  };

  setTimeout(() => {
    const now = new Date().getTime();
    

    // Find the distance between now and the count down date
    distance = date1 - now;

    // Time calculations for days, hours, minutes and seconds
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (Notification.permission === "granted") {
      showNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification();
        }
      });
    }
  }, 2000);


  const x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();
    

    // Find the distance between now and the count down date
    distance = date1 - now;

    // Time calculations for days, hours, minutes and seconds
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    showNotification();
    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      console.log("EXPIRED");
      showNotification();
    }
  }, 20000); //6 saatte bir 21600000

  
};

export default Bildirim;
