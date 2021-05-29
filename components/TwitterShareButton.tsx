type Props = {
  url: string;
  text: string;
};

const TwitterShareButton = (props: Props) => {
  const url = `https://twitter.com/share?url=${encodeURIComponent(
    props.url
  )}&text=${encodeURIComponent(props.text)}&hashtags=MyQuestionService`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopenner"
      className="twitter-share-button"
    >
      <img
        src="/images/twitter_social_icons_roundedsquare_white.svg"
        alt="twitter"
        width="24"
        height="24"
      />
      <span>シェア</span>
    </a>
  );
};

export default TwitterShareButton;
