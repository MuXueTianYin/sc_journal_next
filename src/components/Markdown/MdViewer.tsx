'use client';
import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import 'github-markdown-css/github-markdown-light.css';
import { setTheme } from "bytemd-plugin-theme";
import {useEffect, useState} from "react";
import type { BytemdPlugin } from "bytemd";
import rehypeSlug from "rehype-slug";
import gfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json";




const autolinkHeadingsPlugin = (): BytemdPlugin => {
    return {
        rehype: (processor) => processor.use(rehypeSlug),
    };
};

interface Props {
    value?: string;
    theme?: string;
}

const plugins = [
    gfm({ locale: gfmZhHans }),
    highlight(),
    autolinkHeadingsPlugin()
];

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer = (props: Props) => {
    const { value = "", theme = "channing-cyan" } = props;
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setTheme(theme);
        setIsClient(true);
    }, [theme]);

    if (!isClient) return null;



    return (
        <div className="md-viewer">
            <Viewer value={value} plugins={plugins} className="markdown-body" />
        </div>
    );
};

export default MdViewer;


