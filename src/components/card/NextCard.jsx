import Link from "next/link"

export const NextCard = ({id, title, description}) => {
  return (
    <Link
        href={`nextClient/${id}`}
        className="group rounded-lg w-fit hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors p-5"
        rel="noopener noreferrer"
    >
        <h2 className="mb-3 text-2xl font-semibold">
            {title}
        </h2>
        <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
            {description}
        </p>
    </Link>
  )
}