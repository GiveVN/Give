const fetch = require("node-fetch")

async function createProjectUpdate() {
  try {
    // First, get the project ID
    const projectSlug = "chuong-trinh-hoc-bong-sinh-vien-ngheo"

    const projectResponse = await fetch(
      `http://localhost:1338/api/projects?filters[Slug][$eq]=${projectSlug}&fields[0]=id&fields[1]=documentId&fields[2]=Title`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const projectData = await projectResponse.json()

    if (!projectData.data || projectData.data.length === 0) {
      console.error("Project not found")
      return
    }

    const project = projectData.data[0]
    console.log(
      `Found project: ${project.Title} (ID: ${project.id}, Document ID: ${project.documentId})`
    )

    // Create a project update
    const updateData = {
      data: {
        Title: "Cập nhật tiến độ dự án - Tháng 1/2025",
        Content:
          "Chúng tôi vui mừng thông báo đã hoàn thành giai đoạn đầu của dự án học bổng.\n\n## Những thành tựu đạt được:\n- Đã tuyển chọn được 10 sinh viên đầu tiên\n- Hoàn thành quy trình đánh giá và phỏng vấn\n- Thiết lập quan hệ với 5 trường đại học\n\n## Kế hoạch tiếp theo:\n- Mở rộng chương trình đến 20 sinh viên\n- Tổ chức buổi gặp mặt đầu tiên vào cuối tháng\n- Phát triển hệ thống theo dõi tiến độ học tập\n\nCảm ơn tất cả các nhà tài trợ đã ủng hộ chúng tôi!",
        Excerpt:
          "Đã hoàn thành giai đoạn đầu với 10 sinh viên đầu tiên nhận học bổng.",
        IsPublic: true,
        IsPinned: true,
        ViewCount: 0,
        Project: project.id,
        publishedAt: new Date().toISOString(),
      },
    }

    const createResponse = await fetch(
      "http://localhost:1338/api/project-updates",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    )

    if (!createResponse.ok) {
      const error = await createResponse.text()
      console.error("Failed to create update:", createResponse.status, error)
      return
    }

    const createdUpdate = await createResponse.json()
    console.log("\nProject update created successfully!")
    console.log("Update ID:", createdUpdate.data.id)
    console.log("Document ID:", createdUpdate.data.documentId)
    console.log("Title:", createdUpdate.data.Title)
  } catch (error) {
    console.error("Error:", error)
  }
}

createProjectUpdate()
