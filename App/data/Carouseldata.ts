const path = "../assets/images";

export interface CarouselDataProps {
  img: string;
  title: string;
  subtitle: string;
  align: string;
}

export const homeCarouselData: Array<CarouselDataProps> = [
  {
    img: require(`${path}/lock.png`),
    title: "End to End Encryption",
    subtitle:
      "Providing unparalleled security by protecting your data with our robust end-to-end encryption",
    align: "left",
  },
  {
    img: require(`${path}/shield.png`),
    title: "Multi Factor Authentication",
    subtitle:
      "Fortifying your data with multi-factor authentication for an added layer of defense",
    align: "right",
  },
  {
    img: require(`${path}/locker.png`),
    title: "AWS Servers",
    subtitle:
      "We use high performance servers with the latest security patches to keep your information safe and secured",
    align: "left",
  },
  {
    img: require(`${path}/copy.png`),
    title: "No Paper Trail",
    subtitle:
      "We leave no paper trail behind, making ensure that your digital footprint is private and controversial",
    align: "right",
  },
];

export const WillCarouselData = [
  {
    img: require(`${path}/creating_will.png`),
    title: "Today is the perfect day",
    subtitle:
      "Creating a Will is a thoughtful step. The earlier you plan, the greater the rewards for you!",
    align: "right",
  },
  {
    img: require(`${path}/will_legacy.png`),
    title: "To create your legacy",
    subtitle:
      "Writing a Will empowers you to maintain full control over your wealth, in the present and in the future",
    align: "left",
  },
  {
    img: require(`${path}/will_in_15mins.png`),
    title: "In just 10 minutes",
    subtitle:
      "With Oiconomos, create your will just in 10 minutes for no additional cost",
    align: "right",
  },
  {
    img: require(`${path}/will_addons.png`),
    title: "All in One Place",
    subtitle:
      "Get customised Will, Will registration, expert legal guidance, post-life handholding, and many more all in one place",
    align: "left",
  },
];
