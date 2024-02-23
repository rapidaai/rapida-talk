import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@app/components/form/input';
import { Label } from '@app/components/form/label';
import { CenterContainer } from '@app/components/containers/Center';
import { Textarea } from '@app/components/form/textarea';
import { FormHeading } from '@app/components/form/heading';
import { cn } from '@lib/utils';
import { Button } from '@app/components/form/buttons';
import { prepareUploadFile, deleteUploadedFile } from '../modules/assistantModules';
import { FileLabel } from '@app/components/form/files';
import { ProcessingState, ProcessFile } from '@app/types';

interface AssistantSetupProps {
    assistantName: string;
    setAssistantName: (name: string) => void;
    assistantInstruction: string;
    setAssistantInstruction: (description: string) => void;
    // assistantModel: string;
    // setAssistantModel: (model: string) => void;
    startChatAssistant: () => void;
    isButtonDisabled: boolean;
    isStartLoading: boolean;
    statusMessage: string;
    fileIds: string[];
    setFileIds: React.Dispatch<React.SetStateAction<string[]>>;
}



export const AssistantSetup: React.FC<AssistantSetupProps> = ({
    assistantName,
    setAssistantName,
    assistantInstruction,
    setAssistantInstruction,
    // assistantModel,
    // setAssistantModel,
    startChatAssistant,
    isButtonDisabled,
    isStartLoading,
    statusMessage,
    fileIds,
    setFileIds,
}) => {

    const handleFileIdUpdate = (fileId: string) => {
        setFileIds(prevFileIds => [...prevFileIds, fileId]);
    };


    const handleActiveFileIdsUpdate = (activeFileIds: string[]) => {
        setFileIds(activeFileIds);
    };



    const [fileStatusMessage, setFileStatusMessage] = useState<string>('');
    const [files, setFiles] = useState<ProcessFile[]>([]); // Move files state here

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles) return;

        const originalFiles: File[] = Array.from(selectedFiles);
        originalFiles.forEach(file => {
            const fileData: ProcessFile = { name: file.name, status: ProcessingState.UPLOADING };
            setFiles(currentFiles => [...currentFiles, fileData]);
            prepareUploadFile(file, setFileStatusMessage)
                .then(fileId => {
                    if (fileId) {
                        setFiles(currentFiles =>
                            currentFiles.map(f =>
                                f.name === fileData.name ? { ...f, fileId, status: ProcessingState.UPLOADED } : f
                            )
                        );
                        handleFileIdUpdate(fileId);
                    } else {
                        throw new Error('File ID is undefined');
                    }
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    setFiles(currentFiles =>
                        currentFiles.map(f =>
                            f.name === fileData.name ? { ...f, status: ProcessingState.FAILED } : f
                        )
                    );
                });
        });

        event.target.value = '';
    }, []);


    const handleDelete = useCallback((fileId: string) => {
        const fileIndex = files.findIndex(f => f.fileId === fileId);
        if (fileIndex === -1) return;

        deleteUploadedFile(fileId, setFileStatusMessage)
            .then(() => {
                setFiles(currentFiles => currentFiles.filter(f => f.fileId !== fileId));
                const newFileIds = files.filter(f => f.fileId !== fileId).map(f => f.fileId as string);
                handleActiveFileIdsUpdate(newFileIds);

                setFileStatusMessage(`File deleted successfully.`);
            })
            .catch(error => {
                console.error('Error deleting file:', error);
                setFileStatusMessage(`Failed to delete file.`);
            });
    }, [files]);

    // useEffect(() => {
    //     // setAssistantName("testing-with-02")
    //     // setAssistantDescription("prashant-tesgin with rohi/t 002")
    //     // setAssistantModel('gpt-3.5-turbo-1106')

    // }, [fileIds]);



    return (
        <CenterContainer className='max-w-screen-lg space-y-6'>
            <FormHeading
                heading="Wecome to rapida talk"
            />
            <div className='grid md:grid-cols-2 gap-6'>
                <form className="space-y-6">
                    <fieldset className="space-y-2">
                        <Label htmlFor="assistant" text="Assistant Name"></Label>
                        <Input
                            type="text"
                            required={true}
                            placeholder="eg: your favorite assistant"
                            onChange={(t) => { setAssistantName(t.target.value) }}
                        ></Input>
                    </fieldset>
                    <fieldset className="space-y-2">
                        <Label htmlFor="instructions" text="Instructions"></Label>
                        <Textarea
                            required
                            row={8}
                            onChange={(v) => setAssistantInstruction(v.target.value)}
                            placeholder="An instructions how should your assistant behave..."
                        ></Textarea>
                    </fieldset>
                </form>
                <div className="upload-files-container space-y-6 flex">
                    <fieldset className="space-y-2 flex flex-col w-full">
                        <Label htmlFor="knwl" text="Knowledge" />
                        <div className="flex flex-col items-center justify-center w-full flex-1">
                            <label
                                htmlFor="knwl"
                                className={cn(
                                    'flex flex-col rounded-sm w-full h-full group text-center bg-gray-50 dark:bg-slate-950/50 py-2',
                                )}
                            >
                                <div className="h-full w-full text-center flex flex-col justify-center items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-8 w-8 flex-no-shrink opacity-60"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                        />
                                    </svg>

                                    <p className="pointer-none opacity-70 text-sm">
                                        <span className="">Drag and drop</span> files here <br /> or{' '}
                                        <span className="underline">select a file</span> from your
                                        computer
                                    </p>

                                </div>
                                <input
                                    className="hidden"
                                    required
                                    type="file"
                                    multiple={true}
                                    accept=".xls,.csv,.doc,.docx,.pdf"
                                    onChange={handleFileChange}
                                    name="knwl"
                                    id="knwl"
                                />
                            </label>
                            <div className="grid gap-2 grid-flow-row  max-w-full my-2">
                                {files.map((fl, idx) => {
                                    return (
                                        <FileLabel
                                            key={idx} name={fl.name}
                                            onDelete={() => fl.fileId && handleDelete(fl.fileId)}
                                            className='w-full'
                                            state={fl.status}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    className="w-full h-10 text-base cursor-pointer"
                    type="button"
                    onClick={startChatAssistant}
                    disabled={isButtonDisabled || !assistantName || !assistantInstruction || fileIds.length === 0 || fileIds.some(fileId => typeof fileId === 'undefined')}
                >
                    {isStartLoading ? (
                        <div className="flex flex-col items-center space-y-2">
                            <svg
                                aria-hidden="true"
                                className="h-4 w-4 animate-spin fill-stone-600 text-stone-200"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    ) : "Talk to Rapida Assistant"}
                </Button>

            </div>
        </CenterContainer>
    );
};


