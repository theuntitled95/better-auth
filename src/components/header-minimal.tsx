import Link from "next/link";

export default function HeaderMinimal() {
  return (
    <div className="fixed z-50 flex w-full items-center justify-between border-b border-border bg-transparent px-4 py-3 backdrop-blur-[2px] md:px-1 lg:w-8/12">
      <Link href="/">
        <div className="flex cursor-pointer gap-2">
          <svg
            width="60"
            height="45"
            viewBox="0 0 60 45"
            fill="none"
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 0H15V15H30V30H15V45H0V30V15V0ZM45 30V15H30V0H45H60V15V30V45H45H30V30H45Z"
              className="fill-black dark:fill-white"
            ></path>
          </svg>
          <p className="text-black dark:text-white">SAAS-AUTH.</p>
        </div>
      </Link>
    </div>
  );
}
