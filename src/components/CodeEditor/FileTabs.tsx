import { cn } from '../../utils/classNames';
type FileTabsProps = {
    activeFile: string;
    onFileChange: (filename: string) => void;
    files: string[];
};

export default function FileTabs({
    files,
    activeFile,
    onFileChange,
}: FileTabsProps) {
    return (
        <ul className='flex overflow-x-auto overflow-y-hidden bg-gray-800'>
            {files.map((fileName) => (
                <li key={fileName}>
                    <button
                        className={cn(
                            'bg-gray-800 px-2 py-1 text-white hover:bg-gray-700',
                            activeFile === fileName && 'bg-gray-950 hover:bg-gray-900'
                        )}
                        onClick={() => onFileChange(fileName)}
                    >
                        {fileName}
                    </button>
                </li>
            ))}
        </ul>
    );
}