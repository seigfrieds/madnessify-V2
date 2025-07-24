import "./main.layout.scss";

interface Props {
  children: React.ReactNode;
}

function MainLayoutHeader() {
  return (
    <header>
      <div id="header-content">
        <p>madnessify</p>
        <img
          id="header-profile-picture"
          src="https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f"
        />
      </div>
    </header>
  );
}

function MainLayoutContent({ children }: Props) {
  return <main>{children}</main>;
}

function MainLayout({ children }: Props) {
  return (
    <div id="main-layout">
      <MainLayoutHeader />
      {children}
    </div>
  );
}

MainLayout.Content = MainLayoutContent;

export default MainLayout;
