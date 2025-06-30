export const commentReplyTemplate = {
  subject: '<%= replyAuthor %> replied to your comment on <%= project.Title %>',
  text: `
    Hi <%= parentComment.Author.username %>,
    
    <%= replyAuthor %> has replied to your comment on the project "<%= project.Title %>".
    
    Your comment:
    <%= parentComment.Content %>
    
    Reply:
    <%= reply.Content %>
    
    View the conversation: <%= URL %>/projects/<%= project.Slug %>
    
    Best regards,
    <%= APP_NAME %> Team
    
    ---
    You're receiving this email because you have email notifications enabled. 
    To manage your notification preferences, visit your profile settings.
  `,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Reply to Your Comment</h2>
      
      <p>Hi <strong><%= parentComment.Author.username %></strong>,</p>
      
      <p><strong><%= replyAuthor %></strong> has replied to your comment on the project "<%= project.Title %>".</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #ddd;">
        <p style="margin: 0 0 10px 0; color: #666;">Your comment:</p>
        <p style="margin: 0;"><%= parentComment.Content %></p>
      </div>
      
      <div style="background-color: #e8f4f8; padding: 15px; margin: 20px 0; border-left: 4px solid #0066cc;">
        <p style="margin: 0 0 10px 0; color: #666;">Reply from <%= replyAuthor %>:</p>
        <p style="margin: 0;"><%= reply.Content %></p>
      </div>
      
      <p>
        <a href="<%= URL %>/projects/<%= project.Slug %>" 
           style="display: inline-block; padding: 10px 20px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px;">
          View Conversation
        </a>
      </p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      
      <p style="font-size: 12px; color: #666;">
        Best regards,<br>
        <strong><%= APP_NAME %> Team</strong>
      </p>
      
      <p style="font-size: 11px; color: #999;">
        You're receiving this email because you have email notifications enabled. 
        To manage your notification preferences, <a href="<%= URL %>/profile/settings">visit your profile settings</a>.
      </p>
    </div>
  `
}; 