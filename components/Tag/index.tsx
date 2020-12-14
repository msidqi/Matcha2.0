interface TagProps {
    onClose?: () => void;
    tagName: string;
}

const Tag = ({ onClose, tagName }: TagProps) => (
    <div className="bg-white rounded-3xl border border-gray-400 inline-block px-2 py-1  mx-1 cursor-pointer transform transition duration-300 hover:scale-110 hover:shadow">
        <div className="flex items-center justify-center">
            <p className=" text-gray-700 pr-1">
                {tagName}
            </p>
            <img onClick={onClose} width={20} src="/close_outlined.png" />
        </div>
    </div>
)

export default Tag
