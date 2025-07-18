const Footer = () => {
  return (
    <>
      <footer
        className={"w-full h-12 sticky py-6 transition-colors duration-300 dark:text-neutral-200"}
      >
        <div className="container mx-auto text-center">
          <div
            className={"flex items-center justify-center mx-auto max-w-6xl border-t transition-colors duration-300 border-gray-300 dark:border-gray-700"}
          >
            <p
              className={"text-sm font-medium transition-colors duration-300 p-2"}
            >
              © {new Date().getFullYear()}, Project made by me
            </p>
            <a
              href="https://github.com/STzelas"
              className={"p-2 text-black font-semibold text-sm"}
            >About me</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

