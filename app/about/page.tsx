import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于 SelfHost Hub",
  description: "了解 SelfHost Hub 的使命和目标",
}

export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">关于 SelfHost Hub</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">SelfHost Hub 致力于收集、整理和推广各种优质的自托管服务和工具，帮助您重获数据主权。</p>

        <h2>我们的使命</h2>
        <p>
          在这个数据越来越集中于少数大型科技公司的时代，我们相信每个人都应该有掌控自己数据的权利和能力。 SelfHost Hub
          旨在提供一个全面的资源库，帮助技术爱好者、隐私倡导者和组织找到合适的自托管解决方案。
        </p>

        <h2>为什么选择自托管？</h2>
        <ul>
          <li>
            <strong>数据隐私</strong> - 保持您的数据在您自己的控制之下
          </li>
          <li>
            <strong>定制灵活性</strong> - 根据您的需求定制和调整服务
          </li>
          <li>
            <strong>成本效益</strong> - 长期来看，自托管通常比订阅服务更经济
          </li>
          <li>
            <strong>学习机会</strong> - 获取有关系统管理和网络的宝贵知识
          </li>
          <li>
            <strong>独立性</strong> - 减少对外部服务的依赖
          </li>
        </ul>

        <h2>内容的组织方式</h2>
        <p>
          我们的目录组织了大量精心挑选的自托管服务和工具，并使用标签系统对它们进行分类。这使您可以轻松找到符合特定需求的解决方案，无论是媒体服务器、生产力工具还是智能家居系统。
        </p>
        <p>每个条目都包含基本信息、特点描述以及部署指南的链接，帮助您快速了解并决定是否适合您的需求。</p>

        <h2>贡献</h2>
        <p>
          SelfHost Hub
          是一个社区驱动的项目，我们欢迎您的贡献！如果您知道我们尚未收录的优质自托管工具，或者发现需要更新的信息，请访问我们的
          GitHub 仓库提交您的建议。
        </p>
      </div>
    </div>
  )
}
