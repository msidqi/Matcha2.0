interface TagProps {
    onClose?: () => void;
    tagName: string;
}

const Tag = ({ onClose, tagName }: TagProps) => (
    <div className="bg-white rounded-3xl border border-gray-400 inline-block px-2 py-1 mx-1">
        <div className="flex items-center justify-center">
            <p className=" text-gray-800 pr-1">
                {tagName}
            </p>
            <img onClick={onClose} width={20} src="/close_outlined.png" />
        </div>
    </div>
)

export default Tag
