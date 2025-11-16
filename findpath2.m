% function [shortestPath, shortestPathLength] = findpath2(BW, start, goal)
%     % 检查输入点是否为二维
%     if length(start) ~= 2 || length(goal) ~= 2
%         error('Start and goal must be two-dimensional points.');
%     end
% 
%     % 初始化队列，用于存储路径上的点
%     queue = start; % 队列初始化为起点
%     % 使用 cell 数组来存储队列中的点
%     queueCell = {queue};
% 
%     % 初始化记录每个点的前一个点，以及距离矩阵
%     prev = cell(size(BW, 1), size(BW, 2)); % prev 应该存储坐标向量
%     dist = inf(size(BW, 1), size(BW, 2));
%     dist(start(1), start(2)) = 0; % 起点距离设为0
% 
%     % 标记起点为已访问
%     visited = false(size(BW, 1), size(BW, 2));
%     visited(start(1), start(2)) = true;
% 
%     % 循环直到队列为空或者找到目标点
%     while ~isempty(queueCell)
%         % 取出队列的第一个元素
%         current = queueCell{1};
%         queueCell(1) = []; % 从队列中移除当前点
% 
%         % 获取当前点的邻居
%         neighbors = getNeighbors(BW, current);
% 
%         % 遍历邻居
%         for i = 1:size(neighbors, 1)
%             neighbor = neighbors(i, :);
%             if ~visited(neighbor(1), neighbor(2))
%                 % 标记邻居为已访问
%                 visited(neighbor(1), neighbor(2)) = true;
% 
%                 % 计算从起点到邻居的距离
%                 newDist = dist(current(1), current(2)) + 1;
% 
%                 % 如果找到了更短的路径到邻居
%                 if newDist < dist(neighbor(1), neighbor(2))
%                     % 更新距离
%                     dist(neighbor(1), neighbor(2)) = newDist;
%                     % 更新前一个点，存储为二维坐标
%                     prev{neighbor(1), neighbor(2)} = current;
%                     % 将邻居加入队列
%                     queueCell = [queueCell; {neighbor}];
% 
%                     % 如果邻居是目标点，则结束搜索
%                     if all(neighbor == goal)
%                         break; % 找到目标点，退出内层循环
%                     end
%                 end
%             end
%         end
%     end
% 
%     % 检查是否找到目标点
%     if dist(goal(1), goal(2)) == inf
%         error('未找到从起点到目标点的路径。');
%     end
% 
%     % 从目标点回溯到起点，构建最短路径
%     path = {goal};
%     current = goal;
%     while ~all(current == start)
%         current = prev{current(1), current(2)}; % 使用 cell 类型的 prev 来获取前一个点
%         path = [path; {current}]; % 将当前节点添加到路径数组的开头
%     end
%     % 将路径转换为二维数组
%     shortestPath = cell2mat(path);
% 
%     % 输出最短路径和长度
%     shortestPathLength = dist(goal(1), goal(2));
% end
% 

function [shortestPath, shortestPathLength] = findpath2(BW, start, goal)
    % 检查输入点是否为二维
    if length(start) ~= 2 || length(goal) ~= 2
        error('Start and goal must be two-dimensional points.');
    end


    
     % 交换 start 和 goal 坐标的 x 和 y 位置
    start = fliplr(start);
    goal = fliplr(goal);





    % 初始化队列，用于存储路径上的点
    queue = start; % 队列初始化为起点
    % 使用 cell 数组来存储队列中的点
    queueCell = {queue};
    
    % 初始化记录每个点的前一个点，以及距离矩阵
    prev = cell(size(BW, 1), size(BW, 2)); % prev 应该存储坐标向量
    dist = inf(size(BW, 1), size(BW, 2));
    dist(start(1), start(2)) = 0; % 起点距离设为0
    
    % 标记起点为已访问
    visited = false(size(BW, 1), size(BW, 2));
    visited(start(1), start(2)) = true;
    
    % 循环直到队列为空或者找到目标点
    while ~isempty(queueCell)
        % 取出队列的第一个元素
        current = queueCell{1};
        queueCell(1) = []; % 从队列中移除当前点
        
        % 获取当前点的邻居
        neighbors = getNeighbors(BW, current);
        
        % 遍历邻居
        for i = 1:size(neighbors, 1)
            neighbor = neighbors(i, :);
            if ~visited(neighbor(1), neighbor(2))
                % 标记邻居为已访问
                visited(neighbor(1), neighbor(2)) = true;
                
                % 计算从起点到邻居的距离
                newDist = dist(current(1), current(2)) + 1;
                
                % 如果找到了更短的路径到邻居
                if newDist < dist(neighbor(1), neighbor(2))
                    % 更新距离
                    dist(neighbor(1), neighbor(2)) = newDist;
                    % 更新前一个点，存储为二维坐标
                    prev{neighbor(1), neighbor(2)} = current;
                    % 将邻居加入队列
                    queueCell = [queueCell; {neighbor}];
                    
                    % 如果邻居是目标点，则结束搜索
                    if all(neighbor == goal)
                        break; % 找到目标点，退出内层循环
                    end
                end
            end
        end
    end
    
    % 检查是否找到目标点
    if dist(goal(1), goal(2)) == inf
        error('未找到从起点到目标点的路径。');
    end
    
    % 从目标点回溯到起点，构建最短路径
    path = {goal};
    current = goal;
    while ~all(current == start)
        current = prev{current(1), current(2)}; % 使用 cell 类型的 prev 来获取前一个点
        path = [path; {current}]; % 将当前节点添加到路径数组的开头
    end
    
    % 颠倒路径的顺序，使其从起点到目标点
    shortestPath = flip(cell2mat(path), 1);
    
    % 输出最短路径和长度
    shortestPathLength = dist(goal(1), goal(2));
end