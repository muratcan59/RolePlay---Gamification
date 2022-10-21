interface IPageMenuProps {
    title?: string;
    subTitle?: string;
    menus?: { url: string, title: string, icon: { prefix: string, name: string } }[];
}

export default IPageMenuProps;