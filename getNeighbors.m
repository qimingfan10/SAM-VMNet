% function neighbors = getNeighbors(BW, current)
%     % 定义8领域方向（不包括自己）
%     directions = {
%         [-1, -1]; 
%         [-1,  0];
%         [-1,  1];
%         [ 0, -1];
%         [ 0,  1];
%         [ 1, -1];
%         [ 1,  0];
%         [ 1,  1]
%     };
% 
%     row=current(1);
%     col=current(2);% 当前点的行和列索引
%     neighbors = []; % 初始化邻居数组
% 
%     for i = 1:length(directions)
%         % 计算邻居的坐标
%         neighborRow = row + directions{i}(1);
%         neighborCol = col + directions{i}(2);
% 
%         % 检查邻居是否在图像范围内
%         if all(neighborRow > 0) && all(neighborRow <= size(BW, 1)) && ...
%            all(neighborCol > 0) && all(neighborCol <= size(BW, 2))
% 
%             % 使用逻辑索引确保邻居在边界内且为通路
%             if BW(neighborRow, neighborCol)
%                 neighbors = [neighbors; [neighborRow, neighborCol]]; % 添加邻居坐标
%             end
%         end
%     end
% end

function neighbors = getNeighbors(BW, current)
    % 定义8领域方向（不包括自己）
    directions = {
        [-1, -1];
        [-1,  0];
        [-1,  1];
        [ 0, -1];
        [ 0,  1];
        [ 1, -1];
        [ 1,  0];
        [ 1,  1]
    };
    
    row = current(1);
    col = current(2); % 当前点的行和列索引
    neighbors = zeros(0, 2); % 初始化邻居数组，指定为0行2列

    % 遍历所有方向
    for i = 1:length(directions)
        % 计算邻居的坐标
        neighborRow = row + directions{i}(1);
        neighborCol = col + directions{i}(2);
        
        % 检查邻居是否在图像范围内且为通路
        if neighborRow > 0 && neighborRow <= size(BW, 1) && ...
           neighborCol > 0 && neighborCol <= size(BW, 2) && ...
           BW(neighborRow, neighborCol)
            % 如果邻居在范围内且为通路，添加到邻居数组
            neighbors(end+1, :) = [neighborRow, neighborCol];
        end
    end
end