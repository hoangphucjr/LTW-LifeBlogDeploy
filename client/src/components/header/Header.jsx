import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Our Blog</span>
        <span className="headerTitleLg">Your Stories</span>
      </div>
      <div className="headerImg"></div>
      {/* <img
        className="headerImg"
        src="https://d2fni493fitngs.cloudfront.net/blog/wp-content/uploads/2019/02/12213414/whattowritehowtocreateblogcontent-planoly-banner.png?fbclid=IwAR2Fsx2knBLKBtYjcpZSULjjKA9x3FtbgL330Eq5DsdM5uw5wzjKQIvC_Ro"
        alt=""
      /> */}
    </div>
  );
}