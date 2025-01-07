export const handleScrollToElement = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    elementId: string
) => {
    event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};