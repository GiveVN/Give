export const commentReplyTemplate = {
  subject: 'Someone replied to your comment on <%= project.Title %>',
  text: `
Hello <%= parentComment.Author ? parentComment.Author.username : 'there' %>,

<%= replyAuthor %> has replied to your comment on the project "<%= project.Title %>":

Your comment:
"<%= parentComment.Content %>"

Their reply:
"<%= reply.Content %>"

View the conversation: <%= URL %>/projects/<%= project.Slug %>#comment-<%= reply.id %>

Best regards,
The <%= APP_NAME %> Team
  `,
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Reply to Your Comment</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .project-title {
      color: #2563eb;
      font-size: 18px;
      font-weight: 600;
      margin: 10px 0;
    }
    .comment-box {
      background-color: #f9fafb;
      border-left: 4px solid #e5e7eb;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .reply-box {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .author {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 5px;
    }
    .content {
      color: #4b5563;
    }
    .button {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #2563eb;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>💬 New Reply to Your Comment</h2>
      <p class="project-title">on "<%= project.Title %>"</p>
    </div>
    
    <p>Hello <%= parentComment.Author ? parentComment.Author.username : 'there' %>,</p>
    
    <p><strong><%= replyAuthor %></strong> has replied to your comment:</p>
    
    <div class="comment-box">
      <div class="author">Your comment:</div>
      <div class="content"><%= parentComment.Content %></div>
    </div>
    
    <div class="reply-box">
      <div class="author"><%= replyAuthor %>'s reply:</div>
      <div class="content"><%= reply.Content %></div>
    </div>
    
    <div style="text-align: center;">
      <a href="<%= URL %>/projects/<%= project.Slug %>#comment-<%= reply.id %>" class="button">
        View Conversation
      </a>
    </div>
    
    <div class="footer">
      <p>You're receiving this email because you commented on a project at <%= APP_NAME %>.</p>
      <p>© <%= new Date().getFullYear() %> <%= APP_NAME %>. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `
}; 